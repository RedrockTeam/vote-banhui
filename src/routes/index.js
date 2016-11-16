import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import voteCtrl from '../controllers/voteCtrl'

const router = Router()

router.get('/index', indexCtrl)
router.get('/vote', voteCtrl)

export default router
