import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import voteCtrl from '../controllers/voteCtrl'

import adminCtrl from '../controllers/adminLoginCtrl'

import changeStatusCtrl from '../controllers/changeStatusCtrl'
import typeStatusCtrl from '../controllers/typeStatusCtrl'

const router = Router()

router.get('/vote_drx/index', indexCtrl)
router.post('/vote_drx/vote', voteCtrl)
router.post('/vote_drx/adminLogin', adminCtrl)
router.post('/vote_drx/changeStatus', changeStatusCtrl)

router.get('/vote_drx/typeStatus', typeStatusCtrl)

// router.get('/test', async (ctx) => {
//     await ctx.render('index')
// })
// router.get('/admin', async (ctx) => {
//     await ctx.render('admin')
// })



export default router
