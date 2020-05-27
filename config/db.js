import { config } from 'dotenv'

const mongoose = require('mongoose')
config()

const DB_URI = process.env.DB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('MongoDB Connected...')
  } catch (error) {
    console.error(error.message)
    // Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB
