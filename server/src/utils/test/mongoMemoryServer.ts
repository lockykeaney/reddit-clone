import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { seed } from '../seed';

let memoryServer: MongoMemoryServer;

export const testMongoSetup = async (): Promise<void> => {
  console.log('= Starting test server =');
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  memoryServer = mongoServer;

  await seed();
};

export const testMongoDropDatabase = async (): Promise<void> => {
  if (memoryServer) {
    console.log('= Stopping test server =');
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await memoryServer.stop();
  }
};

// export const testMongoDropCollections = async (): Promise<void> => {
//   if (memoryServer) {
//     const collections = mongoose.connection.collections;

//     for (const key in collections) {
//       const collection = collections[key];
//       await collection.deleteMany();
//     }
//   }
// };
