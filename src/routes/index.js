import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import voteCtrl from '../controllers/voteCtrl'

import adminCtrl from '../controllers/adminLoginCtrl'

import changeStatusCtrl from '../controllers/changeStatusCtrl'
import typeStatusCtrl from '../controllers/typeStatusCtrl'

const router = Router()

router.get('/index', indexCtrl)
router.post('/vote', voteCtrl)
router.post('/adminLogin', adminCtrl)
router.post('/changeStatus', changeStatusCtrl)
router.get('/typeStatus', typeStatusCtrl)

export default router
