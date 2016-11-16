import update_type_status from '../models/update_type_status';

export default async function(ctx, next) {
    const requestBody = ctx.request.body
    const status = requestBody.status
    const type = requestBody.type

    const result = await update_type_status(type, status)
    
    console.log(status, type);
    console.log(result);
    if(result) {
        ctx.body = "修改成功"
    } else {
        ctx.body ='修改失败'
    }

}