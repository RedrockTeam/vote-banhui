import get_type_status from '../models/get_type_status'

export default async function (ctx, next) {
    let type_status = await get_type_status()
    console.log(type_status);

    // performance_info = splitPerformanceOfStatus(performance_info)

    

    await ctx.render('typeStatus.ejs', {
        type_status
    })
}

// function splitPerformanceOfStatus(performance_info) {
//     let pending = []
//     let finish = []
//     let voting = []
//     performance_info.forEach((item) =>{
//         if(item.status === "pending")
//             pending.push(item);
//         if(item.status === 'finish')
//             finish.push(item);
//         if(item.status === 'voting')
//             voting.push(item);
//     });
//     return {
//         pending,
//         finish,
//         voting
//     }
// }