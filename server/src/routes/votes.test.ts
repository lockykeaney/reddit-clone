import mongoose from 'mongoose';
import supertest from 'supertest';
import createApp from '../app';

import { VoteModel, T_Vote } from '../models';

import {
  testMongoSetup,
  testMongoDropDatabase,
} from '../utils/test/mongoMemoryServer';

const app = createApp();

const userId: string = new mongoose.Types.ObjectId().toString();
const postId: string = new mongoose.Types.ObjectId().toString();
const MOCK_VOTE: T_Vote = {
  postId,
  voteUserId: userId,
};

describe('Vote routes', () => {
  beforeAll(async () => {
    await testMongoSetup();
    // await VoteModel.collection.insertOne(MOCK_VOTE);
  });

  afterAll(async () => {
    await testMongoDropDatabase();
  });

  it('Should return a 204 status code when succesful', async () => {
    const { statusCode } = await supertest(app).get(`/votes/vote/${postId}`);
    expect(statusCode).toEqual(204);
  });
  it('Should increment the vote count by up by 1', async () => {});
  it('Should decrement the vote count by down by 1', async () => {});
  it('Should not allow a vote if the current user has already voted', async () => {});
  it('Should get the vote count for a post', async () => {});
});
