import db from '../services/db'

export default async function(openid, type) {
    const now = new Date();

    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const today = {
        begin: new Date(`${year}/${month}/${date}`).getTime(),
        end: new Date(`${year}/${month}/${date+1}`).getTime()
    }

    const res = await db.query('select * from vote_info where open_id = ? AND time > ? AND time < ?', [openid, today.begin, today.end])
    console.log(res[0].length);
    if (res[0].length < 3) {
        return false;
    }
    return true;
}