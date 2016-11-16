import db from '../services/db'

export default async function(type, status) {
    return (await db.query('update performance_info set status = ? where type = ?', [status, type]))
}