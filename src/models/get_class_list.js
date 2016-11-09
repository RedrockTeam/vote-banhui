import db from '../services/db'
export default async function (academyId) {
    return (await db.query('select * from class where academy_id = ?', [academyId]))[0]
}