import mongoose from 'mongoose';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import createApp from '../app';

import { VoteModel, T_Vote, PostModel, T_PostInput } from '../models';

import {
  testMongoSetup,
  testMongoDropDatabase,
} from '../utils/test/mongoMemoryServer';

const app = createApp();

let postId: string;

const MOCK_POST: T_PostInput = {
  content: faker.lorem.paragraph(),
  postedByUserId: new mongoose.Types.ObjectId().toString(),
};

describe('Vote routes', () => {
  beforeAll(async () => {
    await testMongoSetup();
    const mockPost = await PostModel.collection.insertOne(MOCK_POST);
    postId = mockPost.insertedId;
    await VoteModel.collection.insertOne({
      postId,
      voteUserId: new mongoose.Types.ObjectId().toString(),
      vote: 'UPVOTE',
    });
  });

  afterAll(async () => {
    await testMongoDropDatabase();
  });

  it('Should get the vote count for a post', async () => {
    const { body, statusCode } = await supertest(app).get(
      `/votes/vote-count/${postId}`
    );
    expect(statusCode).toEqual(200);
    expect(body.totalVotes).toEqual(0);
  });
  it('Should return a 204 status code when succesful upvote', async () => {
    const { statusCode } = await supertest(app).get(`/votes/upvote/${postId}`);
    expect(statusCode).toEqual(204);
  });
  it('Should increment the total vote count by up by 1', async () => {
    const firstVoteCount = await supertest(app).get(
      `/votes/vote-count/${postId}`
    );
    expect(firstVoteCount.body.totalVotes).toEqual(1);
    const upvote = await supertest(app).get(`/votes/upvote/${postId}`);
    expect(upvote.statusCode).toEqual(204);
    const secondVoteCount = await supertest(app).get(
      `/votes/vote-count/${postId}`
    );
    expect(secondVoteCount.body.totalVotes).toEqual(2);
  });
  it('Should count the number of upvotes for a post', async () => {
    await supertest(app).get(`/votes/upvote/${postId}`);
    const upVoteCount = await supertest(app).get(`/votes/vote-count/${postId}`);
    expect(upVoteCount.body.upVotes).toEqual(3);
    expect(upVoteCount.body.totalVotes).toEqual(3);
  });
  it('Should count the number of downvotes for a post', async () => {
    await supertest(app).get(`/votes/downvote/${postId}`);
    const downVoteCount = await supertest(app).get(
      `/votes/vote-count/${postId}`
    );
    expect(downVoteCount.body.downVotes).toEqual(1);
    expect(downVoteCount.body.totalVotes).toEqual(4);
  });
  it('Should not allow a vote if the current user has already voted', async () => {
    const { statusCode, body } = await supertest(app).get(
      `/votes/upvote/${postId}`
    );
    expect(body.message).toBe('Already Voted');
    // Middleware to check user is logged in, then use the ID
  });
});
