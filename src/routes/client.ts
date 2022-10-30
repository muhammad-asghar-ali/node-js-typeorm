import express from 'express'
import { createClient, deleteClient } from '../controllers/clientController'

const router = express.Router()

router.post('/create', createClient)
router.delete('/:clientId', deleteClient)

export default router