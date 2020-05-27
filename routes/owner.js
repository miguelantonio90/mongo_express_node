import express from 'express'
import { OwnerController } from '../controllers/Owner'

const router = express.Router()

router.get('/', async (req, res) => {
  await OwnerController.get(req, res)
})

router.get('/:id', async (req, res) => {
  await OwnerController.getById(req, res)
})

router.post('/', async (req, res) => {
  await OwnerController.create(req, res)
})

router.put('/:id', async (req, res) => {
  await OwnerController.update(req, res)
})

router.delete('/:id', async (req, res) => {
  await OwnerController.remove(req, res)
})

module.exports = router
