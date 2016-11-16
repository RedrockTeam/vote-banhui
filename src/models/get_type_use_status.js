import db from '../services/db'

export default async function(status) {
    return (await db.query('select * from performance_info where status = ?', [status]))[0]
}