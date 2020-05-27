import express from 'express'
import { AssetController } from '../controllers/Asset'

const router = express.Router()

router.get('/', async (req, res) => {
  await AssetController.get(req, res)
})

router.get('/:id', async (req, res) => {
  await AssetController.getById(req, res)
})

router.post('/', async (req, res) => {
  await AssetController.create(req, res)
})

router.put('/:id', async (req, res) => {
  await AssetController.update(req, res)
})

router.delete('/:id', async (req, res) => {
  await AssetController.remove(req, res)
})

module.exports = router