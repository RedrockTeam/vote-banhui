import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import detailCtrl from '../controllers/detailCtrl'
import voteCtrl from '../controllers/voteCtrl'

const router = Router()

router.get('/index', indexCtrl)
router.post('/vote', voteCtrl)

export default router
