'use strict'
import request from 'request'
import crypto from 'crypto'

export default class WX {
  constructor(appid, http) {
    this.appid = 'wx81a4a4b77ec98ff4'
    this.http = http
  }
  async getJsSdk () {
    const URL = 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/Api/Api/apiJsTicket'
    const DATA = formatData()
    try {
      let RES_INF = await requestPost(URL, DATA)
      RES_INF.timeStamp = DATA.timestamp
      RES_INF.str = DATA.string
      RES_INF.appid = this.appid
      RES_INF.signature = hash(`jsapi_ticket=${RES_INF.data}&noncestr=${RES_INF.str}&timestamp=${RES_INF.timeStamp}&url=${'http://' + 'hongyan.cqupt.edu.cn' + this.http.req.url}`, 'sha1')
      return RES_INF
    } catch (e) { 
      return false
    }
  }
  async getOpenid () {
    let isProduction = process.env.NODE_ENV === 'production';
    let redirect_uri = 'http://localhost:3000/vote_drx/index' //+this.http.req.url;
    if(isProduction) {
      redirect_uri = 'http://hongyan.cqupt.edu.cn/vote_drx' + this.http.req.url
    }
    redirect_uri = encodeURIComponent(redirect_uri)
    const APPID = this.appid
    const URL = 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/Api/Api/webOauth'
    // const LOCATION = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=sfasdfasdfefvee#wechat_redirect`
    const LOCATION = `http://hongyan.cqupt.edu.cn/GetWeixinCode/get-weixin-code.html?appid=${APPID}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=fuckweixin#wechat_redirect`;
    let code = this.http.query['code']
    if (code) {
      const DATA = formatData(null, code)
      try {
        const RES_INF = await requestPost(URL, DATA)
        return RES_INF
      } catch (e) {
        return false
      }
    } else {
      this.http.res.writeHead('307', {'Location': LOCATION})
      this.http.res.end()
    }
  }
   /**
   * 该方法通过openid查询该人是否绑定了学号
   */
  async getBindVerify (openid) {
    const URL = 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/Api/Api/bindVerify'
    const DATA = formatData(openid) 
    try {
      const RES_INF = await requestPost(URL, DATA)
      return RES_INF
    } catch (e) {
      return false
    }
  }
  /**
   * 该方法通过openid查询该人是否关注
   */
  async getOpenidVerify (openid) {
    const URL = 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/Api/Api/openidVerify'
    const DATA = formatData(openid) 
    try {
      const RES_INF = await requestPost(URL, DATA)
      return RES_INF
    } catch (e) {

    }
  }
   /**
   * 该方法通过openid查询该人信息
   */
  async getUserInf (openid) {
    const URL = 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/Api/Api/userinfo'
    const DATA = getData(openid) 
    try {
      const RES_INF = await requestPost(URL, DATA)
      return RES_INF
    } catch (e) {
      return false
    }
  }
}

function makeStr () {
  let sStr = 'abcdefghijklmnopqistuvwxyz0123456789ABCDEFGHIGKLMNOPQISTUVWXYZ'
  let rStr = ''
  for (let i = 0; i < 16; i++) {
    rStr += sStr[selectFrom(0,61)]
  }
  return rStr
}
function selectFrom (lower, upper) {
  let choices = upper - lower + 1
  return Math.floor(Math.random() * choices + lower)
}
function hash (str, type) {
  let hashObj = crypto.createHash(type)
  hashObj.update(str)
  return hashObj.digest('hex')
}
function requestPost (url,data) {
  return new Promise(function (resolve, reject) {
    request.post(url, {form: data}, function (err, res, body) {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(body))
      }
    })
  })
}


function formatData (openid, code) {
  const token = 'gh_68f0a1ffc303'
  const timeStamp = Math.floor(new Date().getTime()).toString()
  const str = makeStr()
  const secret = hash(hash(timeStamp, 'sha1') + hash(str, 'md5') + 'redrock', 'sha1')
  const data = {
      "timestamp": timeStamp,
      "string": str,
      "secret": secret,
      "token": token,
  }
  if (code) {
    data.code = code
  } else if (openid) {
    data.openid = openid
  }
  return data
}