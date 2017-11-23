import db from '../services/db'
/*
* conf {
    vote_user_id: 用户id
    vote_time: 投票时间戳
    vote_academy_id: 投票学院
    vote_num: 票数
    vote_day: 投票日期
    vote_class_id: 班级id
}
*/
export default async function (conf) {
    try {
        await db.query(
            'insert into vote values(null, ?, ?, ?, ?, ?, ?)', 
            [conf.vote_user_id, conf.vote_time, conf.vote_academy_id, conf.vote_num, conf.vote_day, conf.vote_class_id]
        )
        await db.query(
            'update class set vote_num = vote_num + 1 where id = ?',
            [conf.vote_class_id]
        )
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}