import { faker } from '@faker-js/faker';
import { AccountModel, PostModel } from '../../models';

export const createDefaultTestAccount = async (): Promise<void> => {
  try {
    const defaultTestAccount = {
      loginEmailAddress: 'test_account01@email.com',
      username: 'test01',
      password: 'simpletest321',
    };
    const { id } = await AccountModel.create(defaultTestAccount);
    const posts = await Array.from({ length: 6 }, () => ({
      content: faker.lorem.sentence(),
      postedByUserId: id,
    }));
    await PostModel.insertMany(posts);
    return;
  } catch (error) {
    throw new Error(error);
  }
};
