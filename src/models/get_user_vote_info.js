import db from '../services/db'

export default async function(openid, type) {
    return (await db.query('select * from vote_info where open_id = ? and type = ?', [openid, type]))[0]
}