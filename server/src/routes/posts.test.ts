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

  it('[GET] all posts - return 204 if no posts are found ', async () => {
    const { statusCode } = await supertest(app).get('/posts/all-posts');
    expect(statusCode).toEqual(204);
  });

  it('[GET] all posts - return and array of posts', async () => {
    const COUNT = 5;
    const mockData = generateAccountList(COUNT);
    await PostModel.collection.insertMany(mockData);
    const { body } = await supertest(app).get('/posts/all-posts');
    expect(body.length).toEqual(COUNT);
  });

  it('[POST] create new - create a new post and return the object', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const PAYLOAD: T_Post = {
      content: faker.lorem.paragraph(),
      postedByUserId: userId,
    };
    const { body, statusCode } = await supertest(app)
      .post('/posts/new')
      .send(PAYLOAD);
    expect(statusCode).toEqual(200);
    expect(body.content).toEqual(PAYLOAD.content);
    expect(body.postedByUserId).toEqual(userId);
  });

  it('[GET] single post - return object when passing ID', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const content = faker.lorem.paragraph();
    const PAYLOAD: T_Post = {
      content: content,
      postedByUserId: userId,
    };
    const dummyResponse = await PostModel.collection.insertOne(PAYLOAD);

    const { body, statusCode } = await supertest(app).get(
      `/posts/${dummyResponse.insertedId}`
    );
    expect(statusCode).toEqual(200);
    expect(body.postedByUserId).toBe(userId);
    expect(body.content).toBe(content);
    expect(body.upvotes).toBe(0);
    expect(body.downvotes).toBe(0);
  });
  it('[GET] single post - return 204 if a post is not found', async () => {
    const { statusCode } = await supertest(app).get(
      `/posts/${new mongoose.Types.ObjectId().toString()}`
    );
    expect(statusCode).toEqual(204);
  });
});
