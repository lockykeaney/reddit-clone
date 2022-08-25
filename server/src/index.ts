import express, {
  json,
  urlencoded,
  Application,
  Request,
  Response,
} from 'express';
import cors from 'cors';

const app: Application = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const apiPort = 4000;

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Root endpoint' });
});

const start = async () => {
  try {
    app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
