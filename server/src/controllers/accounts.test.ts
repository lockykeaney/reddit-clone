import { getAccountById, getAccountList } from './accounts';

import { AccountModel, T_Account } from '../models';

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const MOCK_ACCOUNTS_LIST = [
  {
    dateCreated: '2022-09-10T09:36:53.862Z',
    lastDateActive: '2022-09-10T09:36:53.862Z',
    score: 0,
    _id: '631c5b674f2de9094fe59f01',
    loginEmailAdress: 'hashed_password@email.com',
    password: '$2a$10$yce2/eY4bjnsbLmZvbhyFetP.CmJbuU1VlDwFxNa.cVuBMsnlwyJ.',
    username: 'BigBoi',
    __v: 0,
  },
];
let mongo: any;
beforeAll(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
  await AccountModel.collection.insert(MOCK_ACCOUNTS_LIST);
});

// beforeEach(async () => {
//   const collections = await mongoose.connection.db.collections();

//   for (let collection of collections) {
//     await collection.deleteMany({});
//   }
// });

afterAll(async () => {
  jest.setTimeout(20000);
  await mongo.stop();
  await mongoose.connection.close();
});

describe('Accounts Controllers', () => {
  it('Should get a list of all accounts', async () => {
    const list = await getAccountList(null, {});
  });
});
