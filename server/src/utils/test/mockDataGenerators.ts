import { faker } from '@faker-js/faker';
import { T_Account, T_Post, AccountModel, PostModel } from '../../models';
import { testMongoSetup } from './mongoMemoryServer';

export const generateAccountList = async (
  count: number
): Promise<T_Account[]> => {
  return await Array.from({ length: count }, () => ({
    loginEmailAdress: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
    dateCreated: new Date(),
    lastDateActive: new Date(),
  }));
};

export const generatePosts = async (
  count: number,
  accountIds: string[]
): Promise<any> => {
  return await Array.from({ length: count }, () => ({
    content: faker.lorem.sentence(),
    postedByUserId: accountIds[Math.floor(Math.random() * accountIds.length)],
  }));
};

export const seedDatabase = async (): Promise<any> => {
  await testMongoSetup();
  // Seed a list of accounts
  const accountList = await generateAccountList(10);
  const accountIds = await AccountModel.insertMany(accountList).then(
    (res: any) => res.map((account: any) => account.id)
  );
  // Seed a series of posts using account ids
  const postList = await generatePosts(30, accountIds);
  const postIds = await PostModel.insertMany(postList).then((res: any) => res);
  return postIds;
};
// Seed a series of posts using account ids

// Seed votes for a few posts using account ids and post ids

// export to a json file with the date
