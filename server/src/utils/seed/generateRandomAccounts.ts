import { faker } from '@faker-js/faker';
import { AccountModel, T_Account } from '../../models';

export const generateRandomAccounts = async (
  count: number
): Promise<string[]> => {
  const accounts = Array.from({ length: count }, () => ({
    loginEmailAddress: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
  }));

  //   accounts.map(async (item) => {
  //     const res = await AccountModel.create(item);
  //     return res;
  //   });
  return await AccountModel.insertMany(accounts).then((res) =>
    res.map((account) => account.id)
  );
};
