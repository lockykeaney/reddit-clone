import express, {
  json,
  urlencoded,
  Application,
  Request,
  Response,
} from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './routes';

const createApp = (): Application => {
  const app: Application = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Root endpoint!' });
  });

  app.use(router);

  return app;
};

export default createApp;
