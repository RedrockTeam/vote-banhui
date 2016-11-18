import db from '../services/db'

export default async function () {
    try {
        await db.query('update performance_info set vote_num = 0')
        await db.query('delete from vote_info')
        return true
    } catch(e) {
        if(e) {
            console.log(e);
            return false
        }
    }

}