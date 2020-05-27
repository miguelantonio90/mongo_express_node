import express from 'express'
import auth from '../middleware/auth'

import { fetchAll, getById } from '../controllers/User'

const router = express.Router()

router.get('/', async (req, res) => {
  await fetchAll(req, res)
})

router.get('/{id}', auth, async (req, res) => {
  await getById(req, res)
})

module.exports = router