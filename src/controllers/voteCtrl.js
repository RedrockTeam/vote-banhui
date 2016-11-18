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
    }
}


export default async function(ctx, next) {
    const openidObj = ctx.session.openidObj
    const requestBody = ctx.request.body.data

    const type = requestBody.type
    const performanceId = requestBody.id
    

    console.log("type: ", type);
    console.log(performanceId);

    if (!openidObj) {
        ctx.body = error[1]
        return
    }


    const openid = openidObj.data.openid
    
    if(! (await isVotingType(performanceId))) {
        ctx.body = error[2]
        return
    }

    // console.log("isVoted", (await isVoted(openid, type)))
    if(( await isVoted(openid, type))) {
        ctx.body = error[3]
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



async function isVoted(openid, type) {
    let voteInfo = await get_user_vote_info(openid, type)
    // console.log("voteInfo", voteInfo[0])
    return !!(voteInfo[0])
}

async function isVotingType(performanceId) {
    let votingType = (await get_status(performanceId))[0].status
    console.log("votingType: ", votingType)
    return votingType === 'voting'
}

