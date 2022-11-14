import { getAllPosts } from './posts';
import { T_Post, PostModel } from '../models';

const ALL_POSTS: T_Post[] = [
  {
    content: 'This is the content of the post',
    postedByUserId: 'xyz123',
    created: new Date(),
    updated: undefined,
    comments: [],
    upvotes: 0,
    downvotes: 0,
  },
];
describe('Posts', () => {
  it('Should return a list of all posts', async () => {
    const PostModelFindMock = jest.spyOn(PostModel, 'find');
    // jest.spyOn(PostModel, 'find').mockReturnValueOnce(ALL_POSTS);
    // PostModelFindMock.mockResolvedValueOnce(ALL_POSTS);
  });
  //   it('Should create a new post', () => {
  //     const DATA: T_Post = {
  //       content: 'This is the content of the post',
  //       postedByUserId: 'xyz123',
  //       created: new Date(),
  //       updated: undefined,
  //       comments: [],
  //       upvotes: 0,
  //       downvotes: 0,
  //     };
  //     const req = { body: DATA }
  //     const res = {}

  //   });
});
