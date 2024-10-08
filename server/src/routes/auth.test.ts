import mongoose from 'mongoose';
import supertest from 'supertest';
import createApp from '../app';
import { PostModel, T_Post } from '../models';
import { faker } from '@faker-js/faker';

import { generateAccountList } from '../utils/test/mockDataGenerators';
import {
  testMongoSetup,
  testMongoDropDatabase,
} from '../utils/test/mongoMemoryServer';
const app = createApp();

describe('Posts Routes', () => {
  beforeAll(async () => {
    await testMongoSetup();
  });

  afterAll(async () => {
    await testMongoDropDatabase();
  });

  describe('Login', () => {
    it('Should return a JWT token on after login', async () => {});
  });
});
