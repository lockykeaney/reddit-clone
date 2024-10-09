import mongoose from 'mongoose';
import supertest from 'supertest';
import createApp from '../app';
import { PostModel, T_Post } from '../models';
import { faker } from '@faker-js/faker';

import { generateAccountList } from '../utils/test/mockDataGenerators';
import { POSTS_ROUTES } from './posts';
import {
  testMongoSetup,
  testMongoDropDatabase,
} from '../utils/test/mongoMemoryServer';
const app = createApp();

const createRoute = (route: string, id?: string) => `/posts/${id ? id : route}`;

describe('Posts Routes', () => {
  beforeAll(async () => {
    await testMongoSetup();
    const { statusCode } = await supertest(app).post(
      createRoute(POSTS_ROUTES.LIST)
    );
    expect(statusCode).toEqual(204);

    const mockData = await generateAccountList(20);
    await PostModel.collection.insertMany(mockData);
  });

  afterAll(async () => {
    await testMongoDropDatabase();
  });

  it('getCountOfPosts', async () => {
    const { body } = await supertest(app).get(createRoute(POSTS_ROUTES.COUNT));
    expect(body.count).toEqual(20);
  });

  it('[POST] list of posts with the default', async () => {
    const { body } = await supertest(app).post(createRoute(POSTS_ROUTES.LIST));
    expect(body.length).toEqual(10);
  });

  it('[GET] list of posts with a limit', async () => {
    const { body } = await supertest(app)
      .post(createRoute(POSTS_ROUTES.LIST))
      .send({ limit: 5 });
    expect(body.length).toEqual(5);
  });

  it('[POST] create new - create a new post and return the object', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const PAYLOAD: T_Post = {
      content: faker.lorem.paragraph(),
      postedByUserId: userId,
    };
    const { body, statusCode } = await supertest(app)
      .post(createRoute(POSTS_ROUTES.NEW))
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
      createRoute(dummyResponse.insertedId)
    );
    expect(statusCode).toEqual(200);
    expect(body.postedByUserId).toBe(userId);
    expect(body.content).toBe(content);
    expect(body.votes.length).toBe(0);
  });

  it('[GET] single post - return 204 if a post is not found', async () => {
    const { statusCode } = await supertest(app).get(
      createRoute(new mongoose.Types.ObjectId().toString())
    );
    expect(statusCode).toEqual(204);
  });

  it('[PATCH] update a single item', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const content = faker.lorem.paragraph();
    const PAYLOAD: T_Post = {
      content: content,
      postedByUserId: userId,
    };
    const originalPost = await PostModel.collection.insertOne(PAYLOAD);
    const UPDATE_PAYLOAD: T_Post = {
      content: 'This has been updated',
    };
    const { body: updatedPost } = await supertest(app)
      .patch(createRoute(originalPost.insertedId))
      .send(UPDATE_PAYLOAD);
    expect(updatedPost.content).toBe(UPDATE_PAYLOAD.content);
  });
});
