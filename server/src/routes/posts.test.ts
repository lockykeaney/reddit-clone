import mongoose from 'mongoose';
import supertest from 'supertest';
import createApp from '../app';
import { PostModel, T_Post } from '../models';
import { faker } from '@faker-js/faker';

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

  it('getCountOfPosts', async () => {
    const { body } = await supertest(app).get('/posts/posts-count');
    expect(body.count).toEqual(36); // random posts + the default account posts
  });

  it('[POST] list of posts with the default', async () => {
    const { body } = await supertest(app).post('/posts/list');
    expect(body.length).toEqual(10);
  });

  it('[GET] list of posts with a limit', async () => {
    const { body } = await supertest(app)
      .post('/posts/list')
      .send({ limit: 5 });
    expect(body.length).toEqual(5);
  });

  it('[POST] create new - create a new post and return the object', async () => {
    const PAYLOAD: T_Post = {
      content: faker.lorem.paragraph(),
    };
    const login = await supertest(app)
      .post('/auth/login')
      .send({ username: 'test01', password: 'simpletest321' });

    const { body, statusCode } = await supertest(app)
      .post('/posts/new')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(PAYLOAD);
    expect(statusCode).toEqual(200);
    expect(body.content).toEqual(PAYLOAD.content);
    // expect(body.postedByUserId).toEqual(posterBody._id);
  });

  it('[POST] create new - reject the submission if the user is not authentication', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const PAYLOAD: T_Post = {
      content: faker.lorem.paragraph(),
      postedByUserId: userId,
    };

    const { statusCode } = await supertest(app)
      .post('/posts/new')
      .send(PAYLOAD);
    expect(statusCode).toEqual(401);
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
  });

  it('[GET] single post - return 204 if a post is not found', async () => {
    const { statusCode } = await supertest(app).get(
      `/posts/${new mongoose.Types.ObjectId().toString()}`
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
      .patch(`/posts/${originalPost.insertedId}`)
      .send(UPDATE_PAYLOAD);
    expect(updatedPost.content).toBe(UPDATE_PAYLOAD.content);
  });

  it('[PATCH] throw error if user is not the original poster', async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const content = faker.lorem.paragraph();
    const PAYLOAD: T_Post = {
      content: content,
      postedByUserId: userId,
    };
    const originalPost = await PostModel.collection.insertOne(PAYLOAD);
    const UPDATE_PAYLOAD: T_Post = {
      content: 'This has been updated',
      postedByUserId: 'aabbcc',
    };
    const { body: updatedPost } = await supertest(app)
      .patch(`/posts/${originalPost.insertedId}`)
      .send(UPDATE_PAYLOAD);
    expect(updatedPost.statusCode).toBe(401);
  });
});
