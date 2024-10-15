import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const createDatabase = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  await mongoose.connection.on('connected', () =>
    console.log('Connected to mongoDb')
  );
  await mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection')
  );
};

export default createDatabase;
