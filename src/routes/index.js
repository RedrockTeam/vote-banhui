import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import voteCtrl from '../controllers/voteCtrl'

import adminCtrl from '../controllers/adminLoginCtrl'

import changeStatusCtrl from '../controllers/changeStatusCtrl'
import typeStatusCtrl from '../controllers/typeStatusCtrl'

const router = new Router({
  prefix: '/vote_drx/'
})

router.get('/index', indexCtrl)
router.post('/vote', voteCtrl)
router.post('/adminLogin', adminCtrl)
router.post('/changeStatus', changeStatusCtrl)

router.get('/typeStatus', typeStatusCtrl)

// router.get('/test', async (ctx) => {
//     await ctx.render('index')
// })
// router.get('/admin', async (ctx) => {
//     await ctx.render('admin')
// })



export default router
