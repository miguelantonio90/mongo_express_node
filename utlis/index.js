const jwt = require('jsonwebtoken')
import { config } from 'dotenv'

config()
const jwtToken = process.env.JWT_TOKEN
const tokenExpirationDuration = process.env.TOKEN_EXPIRATION_DURATION

exports.sign = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      jwtToken,
      { expiresIn: tokenExpirationDuration },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}

