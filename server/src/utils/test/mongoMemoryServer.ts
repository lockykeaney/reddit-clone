import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer: MongoMemoryServer;

export const testMongoSetup = async (): Promise<void> => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  memoryServer = mongoServer;
};

export const testMongoDropDatabase = async (): Promise<void> => {
  if (memoryServer) {
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
