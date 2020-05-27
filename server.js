// Importing required modules
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import passport from 'passport'
import session from 'express-session'
import connectDB from './config/db'
import { config } from 'dotenv'

config()

// Defining port
const port = process.env.PORT || 9000

// Defining app
const app = express()

//Add the use of both requires along with another useful method
app.use(
  session({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true,
  })
)
app.use(passport.initialize(undefined))
app.use(passport.session(undefined))

// Connect Database
connectDB().then(r => {})

// Defining middlewares
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.set('view engine', 'html')

// Static folder
app.use(express.static(__dirname + '/views/'))

// Defining the Routes
app.use('/api', require('./routes/index'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/user'))
app.use('/api/asset', require('./routes/asset'))
app.use('/api/owners', require('./routes/owner'))
app.use('/api/category', require('./routes/category'))

// Listening to port
app.listen(port)
console.log(`Listening On http://localhost:${ port }/api`)

module.exports = app
