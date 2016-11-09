import wxService from '../services/wx'
import getClassInfModel from '../models/get_class_inf'
import getUserVoteInfModel from '../models/get_user_vote_inf'
import voteModel from '../models/vote'
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

const startTIme = timeTools.getNormalTime(new Date('Fri Nov 11 2016 00:00:00 ').getTime())
const endTime = timeTools.getNormalTime(new Date('Fri Nov 12 2016 18:00:00 ').getTime())

const success = {
    status: 200,
    msg: 'success'
}
const error = {
    1: {
        status: 404,
        msg: '呵呵'
    },
    2: {
        status: 404,
        msg: '你今天已经投过两次票了'
    },
    3: {
        status: 404,
        msg: '你今天已给该学院投过票了'
    },
    4: {
        status: 500,
        msg: '服务器出了点问题'
    },
    5: {
        status: 404,
        msg: '投票还没开始'
    },
    6: {
        status: 404,
        msg: '投票已经结束'
    }
}

export default async (ctx, next) => {
    const openidObj = ctx.session.openidObj
    if (!openidObj) {
        ctx.body = error[1]
        return
    }
    const nowTime = timeTools.getNormalTime()
    if (nowTime < startTIme) {
        ctx.body = error[5]
    } else if (nowTime > endTime) {
        ctx.body = error[6]
    } else {
        const openid = JSON.parse(openidObj).data.openid;
        let uid = await checkOpenid(openid)

        if (!uid)
            uid = await insertOpenid(openid)
        const voteinf = await voteLogic(uid, ctx.request.body)
        ctx.body = voteinf
    }
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
async function voteLogic (uid, voteQuery) {
    const data = voteQuery.data
    const classInf = await getClassInfModel(data.id)
    let msg;
    if (classInf.length === 0 || classInf[0].academy_id !== parseInt(data.academy)) {
        msg = error[1]
        return msg;
    }
    const toDdayVoteNum = await getUserVoteInfModel(uid, timeTools.getNormalDay())
    if (toDdayVoteNum.length === 0) {
        try {
            await vote(uid, data)
            msg = success
        } catch (e) {
            msg = error[4]
        }
    } else if (toDdayVoteNum.length === 1) {
        if (toDdayVoteNum[0].vote_academy_id === parseInt(data.academy)) {
            msg = error[3]
        } else {
            try {
                await vote(uid, data)
                msg = success
            } catch (e) {
                msg = error[4]
            }
        }
    } else {
        msg = error[2]
    }
    return msg
}
async function vote (uid, data) {
    const normalTime = timeTools.getNormalTime()
    const normalDay = timeTools.getNormalDay(normalTime)
    await voteModel({
        vote_user_id: uid,
        vote_time: normalTime,
        vote_academy_id: data.academy,
        vote_num: 1,
        vote_day: normalDay,
        vote_class_id: data.id,
    })
}