import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { seed } from './utils/databaseHelpers/seedDatabase';

const createDatabase = (): void => {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  mongoose.connection.on('connected', () =>
    console.log('Connected to mongoDb')
  );
  mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection')
  );
  seed();
};

export default createDatabase;
