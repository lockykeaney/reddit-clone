import express, {
  json,
  urlencoded,
  Application,
  Request,
  Response,
} from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import * as dotenv from 'dotenv';
dotenv.config();

import router from './routes';

const createApp = (): Application => {
  const app: Application = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(
    session({
      secret: process.env.SECRET_TOKEN,
      saveUninitialized: true,
      resave: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (_: Request, res: Response) => {
    return res.json({ message: 'Root endpoint!' });
  });

  app.use(router);

  return app;
};

export default createApp;
