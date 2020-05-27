import express from 'express'
import auth from '../middleware/auth'
import { check } from 'express-validator'
import { UserController } from '../controllers/User'

const router = express.Router()

router.get('/', async (req, res) => {
  await UserController.get(req, res)
})

router.get('/:id', auth, async (req, res) => {
  await UserController.getById(req, res)
})

router.post('/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    await UserController.create(req, res)
  }
)

router.put('/:id', async (req, res) => {
  await UserController.update(req, res)
})

router.delete('/:id', async (req, res) => {
  await UserController.remove(req, res)
})

module.exports = router