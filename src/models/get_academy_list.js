import db from '../services/db'
export default async function () {
    return (await db.query('select * from academy'))[0]
}