import Asset from '../models/Asset'
import Owner from '../models/Owner'
import moment from 'moment'

let fetchAll = async (req, res) => {
  try {
    await Asset.find((err, assets) => {
      Asset.populate(assets, { path: 'asset' }, (err, assets) => {
        Owner.populate(assets, { path: 'owner' }, (err, assets) => {
          res.status(200).send(assets)
        })
      })
    }).sort({ createdAt: 'desc' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

let getById = async (req, res) => {
  try {
    await Asset.find(req.params.id, (err, asset) => {
      Asset.populate(asset, { path: 'asset' }, (err, asset) => {
        Owner.populate(asset, { path: 'owner' }, (err, asset) => {
          res.status(200).send(asset)
        })
      })
    }).sort({ createdAt: 'desc' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Internal Server Error')
  }
}

let create = async (req, res) => {
  try {
    let { price, epcId, lastReading, status, owner, category } = req.body

    let proprieties = { price, epcId, lastReading, status, owner, category }

    let newAsset = new Asset(proprieties)

    await newAsset.save()
      .then(asset => {
        res.status(200).json({ 'asset': 'asset in added successfully', id: asset._id })
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
    let { price, epcId, lastReading, status, owner, asset } = req.body
    let filter = {
      _id: req.params.id
    }

    let update = {
      price,
      epcId,
      lastReading,
      status,
      owner,
      asset,
      updatedAt: moment().format('YYYY-MM-DD H:mm:ss')
    }

    await Asset.findOneAndUpdate(filter, update, { new: true }, (err, asset) => {
      if (err)
        res.status(400).send({ msg: 'No such asset exists.' })
      else
        res.status(200).send({ msg: 'The asset has be updated', asset: asset })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

let remove = async (req, res) => {
  try {
    Asset.findByIdAndDelete({ _id: req.params.id }, (err, asset) => {
      if (err)
        res.status(400).send('No such asset exists.')
      else
        res.json('Successfully removed')
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

exports.AssetController = {
  get: fetchAll,
  getById: getById,
  create: create,
  update: update,
  remove: remove
}