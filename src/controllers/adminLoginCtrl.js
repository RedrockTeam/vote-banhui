import {admin} from '../config'


export default async function (ctx) {
    const requestBody = ctx.request.body
    let username = requestBody.username;
    let password = requestBody.password;

    if(username === admin.username && password === admin.password) {
        ctx.redirect("/changeStatus")
    } else {
        ctx.body = '密码错了吧?'
    }
}