import wxService from '../services/wx'
export default async (ctx, next) => {
    let openid = this.session.openid
    if (!openid) {
        this.send({
            status: 404,
            msg: ''
        })
    } else {

    }
}
/*
* 检查该用户openid是否已经存入数据库
* 存入的话返回 true
* 未存入的话返回 false
*/
function checkOpenid () {

}