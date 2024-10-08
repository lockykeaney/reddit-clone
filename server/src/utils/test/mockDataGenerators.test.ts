import { generatePosts, seedDatabase } from './mockDataGenerators';

test('Should return a list of account ids', async () => {
  const output = await seedDatabase();
  console.log(output);
  expect(output.length).toEqual(30);
});

// describe('generatePosts', () => {
//   it('Should create an array of defined length', async () => {
//     const LENGTH = 5;
//     const posts = await generatePosts(LENGTH, ['']);
//     expect(posts.length).toEqual(LENGTH);
//   });

//   it('Should add a random posted id to the post', async () => {
//     const ID_LIST = ['abc', '123', 'xyz'];
//     const posts = await generatePosts(5, ID_LIST);
//     // expect(posts.some(ID_LIST));
//     console.log(posts);
//   });
// });
