import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: String,
  provider: {
    type: String,
    default: 'local'
  },
  google: {},
  facebook: {},
  twitter: {},
  updatedAt: { type: Date, default: Date.now },
})

UserSchema.statics.findOrCreate = require('find-or-create')

let User
module.exports = User = mongoose.model('user', UserSchema)