import update_type_status from '../models/update_type_status';

export default async function(ctx, next) {
    const requestBody = ctx.request.body
    const status = requestBody.status
    const type = requestBody.type

    const result = await update_type_status(type, status)
    
    if(result) {
        ctx.throw(200, '修改成功')
    } else {
        ctx.throw(400, '修改失败')
    }

}