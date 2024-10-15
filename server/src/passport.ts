import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { AccountModel } from './models';
import * as dotenv from 'dotenv';
dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_TOKEN,
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await AccountModel.findById(payload._id);
      if (user) {
        console.log('user === ', user);
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
