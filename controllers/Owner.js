import Owner from '../models/Owner'
import moment from 'moment'

let fetchAll = async (req, res) => {
  try {
    let owners = await Owner.find()
    await res.json(owners)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

let getById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.owner.id)
    res.status(200).send(owner)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Internal Server Error')
  }
}

let create = async (req, res) => {
  try {
    let { name } = req.body
    let filter = {
      name: name
    }
    let owner = await Owner.findOne(filter)
    if (owner) {
      res.status(400).json({ errors: [{ msg: 'Owner is already exists.' }] })
    }
    let proprieties = { name }
    let newOwner = new Owner(proprieties)
    await newOwner.save()
      .then(owner => {
        res.status(200).json({ 'owner': 'owner in added successfully', id: owner._id })
      })
      .catch(err => {
        res.status(400).send('Unable to save to database')
      })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

let update = async (req, res) => {
  try {
    let { name } = req.body
    let filter = {
      _id: req.params.id
    }

    let update = { name, updatedAt: moment().format('YYYY-MM-DD H:mm:ss') }

    await Owner.findOneAndUpdate(filter, update, { new: true }, (err, owner) => {
      if (err)
        res.status(400).send({ msg: 'No such owner exists.' })
      else
        res.status(200).send({ msg: 'The owner has be updated', owner: owner })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

let remove = async (req, res) => {
  try {
    Owner.findByIdAndDelete({ _id: req.params.id }, (err, owner) => {
      if (err)
        res.status(400).send('No such owner exists.')
      else
        res.json('Successfully removed')
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

exports.OwnerController = {
  get: fetchAll,
  getById: getById,
  create: create,
  update: update,
  remove: remove
}