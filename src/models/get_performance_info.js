import db from '../services/db'

export default async function (uid, day) {
    return (await db.query('select * from performance_info'))[0]
}