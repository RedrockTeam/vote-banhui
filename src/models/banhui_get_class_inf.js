import db from '../services/db'
export default async function (classId) {
    return (await db.query('select * from class where id = ?', [classId]))[0]
}