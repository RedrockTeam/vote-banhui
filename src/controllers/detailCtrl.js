import getClassInf from '../models/get_class_inf'
export default async function (ctx, next) {
    const classId = ctx.query['class_id']
    await ctx.render('detail.ejs', {
        data: (await getClassInf(classId))[0]
    })
}