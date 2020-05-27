import Category from '../models/Category'
import moment from 'moment'

let fetchAll = async (req, res) => {
  try {
    let categories = await Category.find()
    await res.json(categories)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

let getById = async (req, res) => {
  try {
    const category = await Category.findById(req.category.id)
    res.status(200).send(category)
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
    let category = await Category.findOne(filter)
    if (category) {
      res.status(400).json({ errors: [{ msg: 'Category is already exists.' }] })
    }
    let proprieties = { name }
    let newCategory = new Category(proprieties)
    await newCategory.save()
      .then(category => {
        res.status(200).json({ 'category': 'category in added successfully', id: category._id })
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

    await Category.findOneAndUpdate(filter, update, { new: true }, (err, category) => {
      if (err)
        res.status(400).send({ msg: 'No such category exists.' })
      else
        res.status(200).send({ msg: 'The category has be updated', category: category })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

let remove = async (req, res) => {
  try {
    Category.findByIdAndDelete({ _id: req.params.id }, (err, category) => {
      if (err)
        res.status(400).send('No such category exists.')
      else
        res.json('Successfully removed')
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

exports.CategoryController = {
  get: fetchAll,
  getById: getById,
  create: create,
  update: update,
  remove: remove
}