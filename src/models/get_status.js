import db from '../services/db'

export default async function(id) {
    return (await db.query('select status from performance_info where id = ? limit 1', [id]))[0]
}