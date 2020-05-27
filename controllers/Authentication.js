import { validationResult } from 'express-validator'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import { sign } from '../utlis'

let login = async (req, res) => {
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }

  let { email, password } = req.body

  console.log(email)

  try {
    let [user] = await Promise.all([User.findOne({ email })])

    if (!user) return res.status(400).send({ errors: [{ msg: 'Invalid credentials' }] })

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) return res.status(400).send({ errors: [{ msg: 'Invalid password' }] })

    await sign({ user: { id: user.id } })
      .then(token => {
        res.status(200).send({ msg: 'Sign in successful local', token, id: user.id })
      })
      .catch(err => res.status(401).send(err))
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal Server Error')
  }
}

let authSocial = async (req, res, type) => {
  await sign({ user: { id: req.user.doc.id } })
    .then(token => {
      res.status(200).send({ msg: 'Sign in successful' + type, token, id: req.user.doc.id })
    })
    .catch(err => res.status(401).send(err))
}

exports.AuthController = {
  login: login,
  authSocial: authSocial
}