import db from 'mysql-promise'
import config from '../config'

const conn = db()
conn.configure(config.db);
export default conn