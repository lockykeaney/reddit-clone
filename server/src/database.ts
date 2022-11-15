import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const createDatabase = (): void => {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  mongoose.connection.on('connected', () =>
    console.log('Connected to mongoDb')
  );
  mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection')
  );
};

export default createDatabase;
