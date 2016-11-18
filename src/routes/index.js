import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import voteCtrl from '../controllers/voteCtrl'

import adminCtrl from '../controllers/adminLoginCtrl'

import changeStatusCtrl from '../controllers/changeStatusCtrl'
import typeStatusCtrl from '../controllers/typeStatusCtrl'
import delete_all_voteCtrl from '../controllers/delete_all_voteCtrl'

const router = Router({
    // prefix: '/vote_drx'
})


router.get('/index', indexCtrl)

router.get('/typeStatus', typeStatusCtrl)

router.post('/vote_drx/vote', voteCtrl)
router.post('/vote_drx/adminLogin', adminCtrl)
router.post('/vote_drx/changeStatus', changeStatusCtrl)
router.post('/vote_drx/delete_all_vote', delete_all_voteCtrl)




export default router
