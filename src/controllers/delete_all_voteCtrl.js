import delete_all_vote from '../models/delete_all_vote'
export default async function (ctx, next) {
    let isAdmin = ctx.session.admin
    if(!isAdmin) return ctx.body = {status: 403, msg: '你不是管理员'}

    let isSuccess = await  delete_all_vote()
    let status = null

    if(isSuccess) {
        status = {
            status: 200,
            msg: 'success'
        }
    } else {
        status = {
            status: 500,
            msg: '删除失败'
        }
    }
    ctx.body = status

}