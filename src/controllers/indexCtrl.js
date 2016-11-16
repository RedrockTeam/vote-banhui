import wxService from '../services/wx'

import get_performance_info from '../models/get_performance_info.js'
// import getClassListModel from '../models/get_class_list'
// import getAcademyListModel from '../models/get_academy_list'

export default async (ctx, next) => {
    const wxServiceObj = new wxService('wx81a4a4b77ec98ff4', ctx)

    if (!ctx.session.openidObj) {
        const openidObj = await wxServiceObj.getOpenid.call(wxServiceObj)

        if (!openidObj) 
            return false 
        ctx.session.openidObj = openidObj
    }
    console.log(ctx.session.openidObj);


    let performance_info = await get_performance_info()

    // console.log(performance_info)



    performance_info = splitPerformanceOfStatus(performance_info)

    let pending_performance = performance_info.pending
    let voting_performance = performance_info.voting
    let finish_performance = performance_info.finish

    // console.log(performance_info);

    ctx.body = performance_info
    // await ctx.render('index.ejs', {
        
    // })
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













