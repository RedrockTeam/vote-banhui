import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import voteCtrl from '../controllers/voteCtrl'

import adminCtrl from '../controllers/adminLoginCtrl'

import changeStatusCtrl from '../controllers/changeStatusCtrl'
import typeStatusCtrl from '../controllers/typeStatusCtrl'

const router = Router({
    // prefix: '/vote_drx'
})


router.get('/index', indexCtrl)
router.post('/vote_drx/vote', voteCtrl)
router.post('/vote_drx/adminLogin', adminCtrl)
router.post('/vote_drx/changeStatus', changeStatusCtrl)

router.get('/typeStatus', typeStatusCtrl)



export default router
