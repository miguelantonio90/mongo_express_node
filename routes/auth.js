import express from 'express'
import auth from '../middleware/auth'
import passportFacebook from '../middleware/facebook'
import passportGoogle from '../middleware/google'
import User from '../models/User'
import { check } from 'express-validator'

const AuthController = require('../controllers/Authentication')

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      '_id name email avatar'
    )
    res.status(200).send(user)
  } catch (err) {
    console.err(err.message)
    res.status(500).send('Server Error')
  }
})

router.post('/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    await AuthController.login(req, res)
  }
)

router.get('/facebook', passportFacebook.authenticate('facebook'))
router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }, null),
  async (req, res) => {
    await AuthController.authSocial(req, res, 'google')
  }
)

router.get('/google',
  passportGoogle.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ]
  }, null)
)
router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }, null),
  async (req, res) => {
    await AuthController.authSocial(req, res, 'google')
  }
)

module.exports = router