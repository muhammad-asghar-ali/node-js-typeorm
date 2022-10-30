import express from 'express'
import { createTransaction } from '../controllers/transactionController'

const router = express.Router()

router.post('/client/:clientId', createTransaction)

export default router