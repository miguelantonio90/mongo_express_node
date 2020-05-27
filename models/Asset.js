import mongoose from 'mongoose'

const AssetSchema = new mongoose.Schema({
  price: {
    type: Number
  },
  epcId: {
    type: String
  },
  lastReading: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref: 'owner'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, ref: 'category'
  }
})

AssetSchema.statics.findOrCreate = require('find-or-create')

let Asset
module.exports = Asset = mongoose.model('asset', AssetSchema)