import * as dotenv from 'dotenv';
dotenv.config();
import express, {
  json,
  urlencoded,
  Application,
  Request,
  Response,
} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

import accountsRouter from './routes/accounts';
import authRouter from './routes/auth';

const app: Application = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

const PORT = 4000;

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Root endpoint!' });
});

app.use('/accounts', accountsRouter);
app.use('/auth', authRouter);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('Connected to mongoDb'));
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection')
);

const start = async () => {
  console.log('Loading with config: ', process.env);
  try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
