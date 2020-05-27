// Define your Controller
import User from '../models/User'

exports.fetchAll = async (req, res) => {
  try {
    let users = await User.find()
    await res.json(users)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

exports.getById = async (req, res) => {
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
