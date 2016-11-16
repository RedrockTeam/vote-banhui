import db from '../services/db'

export default async function(type, status) {
    return (await db.query('select DISTINCT type, status from performance_info'))[0]
}