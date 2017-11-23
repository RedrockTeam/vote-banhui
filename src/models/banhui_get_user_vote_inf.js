import db from '../services/db'
export default async function (uid, day) {
    return (await db.query('select * from vote where vote_user_id = ? and vote_day = ?', [uid, day]))[0]
}