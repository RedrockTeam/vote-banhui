import wxService from '../services/wx'
import db from '../services/db'
export default async (ctx, next) => {
    const openidObj = ctx.session.openidObj
    if (!openidObj) {
        return ctx.send({
            status: 404,
            msg: ''
        })
    }
    const openid = JSON.parse(openidObj).data.openid;
    let id = await checkOpenid(openid)
    if (!id)
        id = await insertOpenid(openid)
}
/*
* 检查该用户openid是否已经存入数据库
* 存入的话返回 true
* 未存入的话返回 false
*/
async function checkOpenid (openid) {
    const user = await db.query(
        'select u_id from user where u_openid = ?',
        [openid]
    )
    if (!user[0].length)
        return false
    else
        return user[0].u_id
}
async function insertOpenid (openid) {
    const inf = await db.query(
        'insert into user values(?, ?, ?)',
        [null, openid, null]
    )
    return inf.insertId
}