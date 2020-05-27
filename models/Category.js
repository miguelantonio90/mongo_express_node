import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  name: {
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

CategorySchema.statics.findOrCreate = require('find-or-create')

let Category
module.exports = Category = mongoose.model('category', CategorySchema)