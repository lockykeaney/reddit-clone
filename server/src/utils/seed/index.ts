import { createDefaultTestAccount } from './createDefaultTestAccount';
import { generateRandomAccounts } from './generateRandomAccounts';
import { generateRandomPosts } from './generateRandomPosts';
import mongoose from 'mongoose';

export const seed = async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'test') {
    await mongoose.connect('mongodb://mongo:27017', { useNewUrlParser: true });
    await mongoose.connection.db.dropDatabase();
  }
  await createDefaultTestAccount();
  const accounts = await generateRandomAccounts(10);
  await generateRandomPosts(30, accounts);
  await mongoose.disconnect();
};

seed();
