import {
  testMongoSetup,
  testMongoDropDatabase,
} from '../utils/test/mongoMemoryServer';

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
