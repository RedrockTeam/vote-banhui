import db from 'mysql-promise'
const conn = db()
conn.configure({
    "host": "localhost",
    "port": 3307,
    "user": "root",
    "password": "",
    "database": "vote_banhui"
})
export default conn