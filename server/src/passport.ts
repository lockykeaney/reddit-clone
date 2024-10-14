import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountModel } from './models';
import * as dotenv from 'dotenv';
dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_TOKEN,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = AccountModel.findById(payload.id);
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
