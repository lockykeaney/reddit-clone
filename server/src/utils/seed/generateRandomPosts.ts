import { faker } from '@faker-js/faker';
import { T_Post, PostModel } from '../../models';

export const generateRandomPosts = async (
  count: number,
  accountIds: string[]
): Promise<T_Post[]> => {
  const posts = Array.from({ length: count }, () => ({
    content: faker.lorem.sentence(),
    postedByUserId: accountIds[Math.floor(Math.random() * accountIds.length)],
  }));

  return await PostModel.insertMany(posts).then((res) => res);
};
