import { generateAccountList, generatePosts } from '../test/mockDataGenerators';
import { AccountModel, PostModel } from '../../models';

// Seed function
export const seed = async (): Promise<any> => {
  const dbHasCount = AccountModel.length > 0 && PostModel.length > 0;

  if (dbHasCount) {
    console.log('Skipping seeding, data exists');
    return;
  }
  console.log('!! Seeding database...');
  const accountList = await generateAccountList(10);
  const accountIds = await AccountModel.insertMany(accountList).then((res) =>
    res.map((account) => account.id)
  );
  // Seed a series of posts using account ids
  const postList = await generatePosts(30, accountIds);
  const postIds = await PostModel.insertMany(postList).then((res) => res);
  return postIds;
};
