import get_performance_info from '../models/get_performance_info'

export default async function (ctx, next) {
    let performance_info = await get_performance_info()

    performance_info = splitPerformanceOfStatus(performance_info)

    ctx.render('type_status.ejs', {
        performance_info
    })
}

function splitPerformanceOfStatus(performance_info) {
    let pending = []
    let finish = []
    let voting = []
    performance_info.forEach((item) =>{
        if(item.status === "pending")
            pending.push(item);
        if(item.status === 'finish')
            finish.push(item);
        if(item.status === 'voting')
            voting.push(item);
    });
    return {
        pending,
        finish,
        voting
    }
}