import express from 'express'
import { createBanker, bankerAndClient } from '../controllers/bankerController'

const router = express.Router()

router.post('/create', createBanker)
router.put('/:bankerId/client/:clientId', bankerAndClient)

export default router