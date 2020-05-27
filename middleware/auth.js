import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

module.exports = function (req, res, next) {
  // Get the token from the header
  const token = req.header('x-auth-token')

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)

    req.user = decoded.user
    next()
  } catch (err) {
    console.err(err)
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
