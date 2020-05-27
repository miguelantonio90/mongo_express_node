// Define your Controller
import gravatar from 'gravatar'
import User from '../models/User'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

let fetchAll = async (req, res) => {
  try {
    let users = await User.find()
    await res.json(users)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

let getById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      '_id name email avatar'
    )
    res.status(200).send(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Internal Server Error')
  }
}

let create = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exists' }] })
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    })
    user = new User({
      name,
      email,
      avatar,
      password,
    })

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    const jwtToken = process.env.JWT_TOKEN
    const tokenExpirationDuration = process.env.TOKEN_EXPIRATION_DURATION

    jwt.sign(
      payload,
      jwtToken,
      { expiresIn: tokenExpirationDuration },
      (err, token) => {
        if (err) throw err
        res.json({ msg: 'User registered', token, id: user.id })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

let update = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id })
    const { name, email, avatar } = req.body

    if (!user) {
      res.status(400).json({
        errors: [{ msg: 'User does not exists with id: ' + req.params.id }],
      })
    }

    user.name = name
    user.email = email
    user.avatar = avatar
    user.save()

    res.status(200).json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

let remove = async (req, res) => {
  try {
    let user = await User.find({ _id: req.params.id })
    if (!user) {
      res.status(400).json({
        errors: [{ msg: 'User does not exists with id: ' + req.params.id }],
      })
    }

    await User.findOneAndDelete({ _id: req.params.id })

    res.status(200).send('User deleted')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

exports.UserController = {
  get: fetchAll,
  getById: getById,
  create: create,
  update: update,
  remove: remove
}
