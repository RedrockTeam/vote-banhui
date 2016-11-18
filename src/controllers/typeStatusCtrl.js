import get_type_status from '../models/get_type_status'

export default async function (ctx, next) {
    let type_status = await get_type_status() 

    await ctx.render('typeStatus.ejs', {
        type_status
    })
}