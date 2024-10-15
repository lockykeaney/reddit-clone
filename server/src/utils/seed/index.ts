import { createDefaultTestAccount } from './createDefaultTestAccount';
import { generateRandomAccounts } from './generateRandomAccounts';
import { generateRandomPosts } from './generateRandomPosts';
// import mongoose from 'mongoose';

export const seed = async (): Promise<void> => {
  console.log('= Seeding test server =');
  await createDefaultTestAccount();
  const accounts = await generateRandomAccounts(10);
  await generateRandomPosts(30, accounts);
};

// seed();
