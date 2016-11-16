import db from '../services/db'
/*
* conf {
    performanceId: 演出节目 id
    openid: 用户id
    type: 演出节目类型
}
*/
export default async function (conf) {
    try {
        console.log(conf);
        await db.query(
            'insert into vote_info values(null, ?, ?, ?)', 
            [conf.performanceId, conf.openid, conf.type]
        )
        await db.query(
            'update performance_info set vote_num = vote_num + 1 where id = ? and type = ?',
            [conf.performanceId, conf.type]
        )
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}