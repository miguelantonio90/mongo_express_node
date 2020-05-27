import mongoose from 'mongoose'

const OwnerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

OwnerSchema.statics.findOrCreate = require('find-or-create')

let Owner
module.exports = Owner = mongoose.model('owner', OwnerSchema)