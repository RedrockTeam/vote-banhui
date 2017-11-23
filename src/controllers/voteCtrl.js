import wxService from '../services/wx'
// import getClassInfModel from '../models/get_class_inf'
// import getUserVoteInfModel from '../models/get_user_vote_inf'
// import voteModel from '../models/vote'
import db from '../services/db'




import get_user_vote_info from '../models/get_user_vote_info'


import get_status from '../models/get_status'


import vote from '../models/vote'


const success = {
    status: 200,
    msg: 'success'
}
const error = {
    1: {
        status: 404,
        msg: '没有 openid, 请刷新页面, 或使用微信登录'
    },
    2: {
        status: 404,
        msg: '该类别的投票, 还没有开始, 或者已经结束'
    },
    3: {
        status: 404,
        msg: '你已经给该类节目投过票了'
    },
    4: {
        status: 500,
        msg: '服务器出了点问题'
    },
    // 2017年的
    5: {
        status: 404,
        msg: '投票时间已过'
    },
    6: {
        status: 404,
        msg: '你今天的三次投票机会已用完'
    }
}


export default async function(ctx, next) {
    const openidObj = ctx.session.openidObj
    const requestBody = ctx.request.body.data

    const type = requestBody.type
    const performanceId = requestBody.id
 
    if (!openidObj) {
        ctx.body = error[1]
        return
    }

    const openid = openidObj.data.openid
   
    if(! (await isVotingType(performanceId))) {
        ctx.body = error[2]
        return
    }
    // 判断今天是否为该类投票
    // // console.log("isVoted", (await isVoted(openid, type)))
    // if(( await isVoted(openid, type))) {
    //     ctx.body = error[3]
    //     return
    // }

    // 2017 这次可以同时投三票, 一天三票
    if(( await isVotedThreeTimes(openid, type))) {
        ctx.body = error[6]
        return
    }

    let isVoteSuccess = await vote({
        performanceId,
        openid,
        type
    });

    if(!isVoteSuccess) {
        ctx.body = error[4]
    } else {
        ctx.body = success
    }


}


// async function isVoted(openid, type) {
//     let voteInfo = await get_user_vote_info(openid, type)
//     return !!(voteInfo[0])
// }

// 2017
async function isVotedThreeTimes(openid, type) {
    return (await get_user_vote_info(openid, type))
}


async function isVotingType(performanceId) {
    let votingType = (await get_status(performanceId))[0].status
    console.log("votingType: ", votingType)
    return votingType === 'voting'
}

