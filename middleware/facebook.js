import dotenv from 'dotenv'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import passport from 'passport'
import User from '../models/User'

dotenv.config()

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.API_URI + process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'emails', 'displayName', 'picture'],
      scope: 'email',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, emails, displayName } = profile
      await User.findOrCreate({ userId: profile.id },
        {
          userId: id,
          name: displayName,
          email: emails.length ? emails[0].value : null,
          provider: 'facebook',
          facebook: profile._json,
        }, (err, user) => {
          return done(err, user)
        }
      )
    }
  )
)

module.exports = passport