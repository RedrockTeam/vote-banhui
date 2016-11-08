import wxService from '../services/wx'
import db from '../services/db'

const votenum = 1

const timeTools = {
    distanceTime: 28800000,
    dayTime: 86400000,
    getNormalTime (time = Date.now()) {
        return time + this.distanceTime
    },
    getNormalDay (time = this.getNormalTime()) {
        return Math.floor(time / this.dayTime)
    }
}

const error = {
    0: {
        status: 200,
        msg: 'success'
    },
    1: {
        status: 404,
        msg: 'parameter is not valid'
    },
    2: {
        status: 404,
        msg: 'the number of votes has run out'
    },
    3: {
        status: 404,
        msg: 'the number of this academy votes has run out'
    },
    4: {
        status: 500,
        msg: 'something is eroor'
    }
}

export default async (ctx, next) => {
    const openidObj = ctx.session.openidObj
    if (!openidObj) {
        ctx.body = error[1]
        return
    }
    const openid = JSON.parse(openidObj).data.openid;
    let uid = await checkOpenid(openid)

    if (!uid)
        uid = await insertOpenid(openid)

    const voteinf = await voteLogic(uid, ctx.query.acad_id)
    ctx.body = voteinf
}
/*
* 检查该用户openid是否已经存入数据库
* 存入的话返回 true
* 未存入的话返回 false
*/
async function checkOpenid (openid) {
    const userinf = await db.query(
        'select u_id from user where u_openid = ?',
        [openid]
    )
    if (userinf[0].length === 0)
        return false
    else
        return userinf[0][0].u_id
}

/*
* 将用户openid放入数据库
*/
async function insertOpenid (openid) {
    const inf = await db.query(
        'insert into user values(?, ?)',
        [null, openid]
    )
    return inf[0].insertId
}
async function voteLogic (uid, acad_id) {
    if (!Array.isArray(acad_id))
        return error[1]
    const tmp = duplicateRemoval(acad_id.filter((item) => {
        return (item === 0 || item === 1)
    }))
    if (tmp.length != acad_id.length) {
        return error[1]
    }
    acad_id = tmp
    if (acad_id.length === 0) {
        return error[1]
    }
    const voteinf = await db.query(
        'select * from vote where vote_user_id = ? and vote_day = ?',
        [uid, timeTools.getNormalDay()]
    )
    const len = voteinf[0].length
    if (len === 0) {
        await vote(uid, acad_id)
        return error[0]
    } else if (len == 2) {
        return error[2]
    } else {
        const [inf] = voteinf[0]
        if (acad_id.length == 2) {
            return error[3]
        } else if (acad_id[0] == inf.vote_academy_id) {
            return error[3]
        } else {
            await vote(uid, acad_id)
            return error[0]
        }
    }
}
async function vote (uid, acad_id) {
    const normalTime = timeTools.getNormalTime()
    const normalDay = timeTools.getNormalDay(normalTime)
    acad_id.forEach(async (acadIdItem) => {
        await db.query(
            'insert into vote values(?, ?, ?, ?, ?, ?)',
            [null, uid, normalTime, acadIdItem, votenum, normalDay]
        )
    })
    return true
}

function duplicateRemoval (arr) {
    const cache = {}
    const newArr = []
    arr.forEach((item) => {
        if (!cache[item]) {
            newArr.push(item)
            cache[item] = true
        }
    })
    return newArr
}