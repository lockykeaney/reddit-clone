import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// let mongo = undefined;

// export const testMongoSetup = async () => {
//   mongo = await MongoMemoryServer.create();
//     const url = mongo.getUri();

//     await mongoose.connect(url, {
//       useNewUrlParser: true,
//     });
// };

// export const testMongoDropDatabase = async () => {
//   if (mongo) {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//     await mongo.stop();
//   }
// };

// export const testMongoDropCollections = async () => {
//   if (mongo) {
//     const collections = mongoose.connection.collections;

//     for (const key in collections) {
//       const collection = collections[key];
//       await collection.deleteMany();
//     }
//   }
// };
