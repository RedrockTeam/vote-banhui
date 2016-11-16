import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import voteCtrl from '../controllers/voteCtrl'

import adminCtrl from '../controllers/adminLoginCtrl'

import changeStatusCtrl from '../controllers/changeStatusCtrl'

const router = Router()

router.get('/index', indexCtrl)
router.post('/vote', voteCtrl)
router.post('/adminLogin', adminCtrl)
router.post('/changeStatus', changeStatusCtrl)
router.get('/test', async (ctx) => {
    await ctx.render('index')
})
router.get('/admin', async (ctx) => {
    await ctx.render('admin')
})


export default router
