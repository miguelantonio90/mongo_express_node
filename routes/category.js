import express from 'express'
import { CategoryController } from '../controllers/Category'

const router = express.Router()

router.get('/', async (req, res) => {
  await CategoryController.get(req, res)
})

router.get('/:id', async (req, res) => {
  await CategoryController.getById(req, res)
})

router.post('/', async (req, res) => {
  await CategoryController.create(req, res)
})

router.put('/:id', async (req, res) => {
  await CategoryController.update(req, res)
})

router.delete('/:id', async (req, res) => {
  await CategoryController.remove(req, res)
})

module.exports = router