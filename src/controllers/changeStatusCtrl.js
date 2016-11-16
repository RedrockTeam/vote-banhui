import update_type_status from '../models/update_type_status';

export default async function(ctx, next) {
    const requestBody = ctx.request.body
    const status = requestBody.status
    const type = requestBody.type

    const result = await update_type_status(type, status)
    
    console.log(status, type);
    console.log(result);
    if(result) {
        ctx.body = {status: 200}
    } else {
        ctx.body = {status: 400, msg: '哦豁, 出了一些问题, 请再试一下, 或者联系冯秋明'}
    }

}