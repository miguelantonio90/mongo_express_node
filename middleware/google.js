import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import dotenv from 'dotenv'
import User from '../models/User'

dotenv.config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.API_URI + process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, email, displayName } = profile
      await User.findOrCreate({ userId: id },
        {
          userId: id,
          name: displayName,
          email: email,
          provider: 'google',
          google: profile._json,
        }, (err, user) => {
          return done(err, user)
        }
      )
    }
  )
)

module.exports = passport