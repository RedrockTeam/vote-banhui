import wxService from '../services/wx'

import get_performance_info from '../models/get_performance_info.js'

export default async (ctx, next) => {

    console.log(ctx.request.body);
    const wxServiceObj = new wxService('wx81a4a4b77ec98ff4', ctx)

    if (!ctx.session.openidObj) {
        const openidObj = await wxServiceObj.getOpenid.call(wxServiceObj)

        if (!openidObj) 
            return false 
        ctx.session.openidObj = openidObj
    }

    // // for dev
    // ctx.session.openidObj = {
    //     data: {
    //         openid: 'openid',  
    //         nickname: 'idsbllp',
    //         sex: "1",
    //         province: "PROVINCE",
    //         city: "CITY",
    //         country: "COUNTRY",
    //         headimgurl: "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
    //         privilege: ["PRIVILEGE1", "PRIVILEGE2"],
    //         unionid: "o6_bmasdasdsad6_2sgVt7hMZOPfL"
    //     }
    // };

    let performance_info = await get_performance_info()

    //  performance_info.forEach((item, index, arr) => {
    //      arr[index].vote_num = ~~(arr[index].vote_num * 3);
    //  })

    performance_info.sort((a, b) => a.vote_num < b.vote_num)   // 按票数排序

    performance_info = classify(performance_info, 'status');   // 按 status分类


    let voting_performance = performance_info.voting
    let finish_performance = performance_info.finish

    voting_performance = classify(voting_performance || [], 'type'); 
    finish_performance = classify(finish_performance || [], 'type');

    await ctx.render('index.ejs', {
        voting_performance,
        finish_performance
    })
}

function classify(arr, t) {
    let  result = {}
    
    arr.forEach((item)=> {
         result[item[t]] =  result[item[t]] ||  []
         result[item[t]].push(item)
    })

    return  result

}