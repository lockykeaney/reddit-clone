import { faker } from '@faker-js/faker';
import { T_Account } from '../../models';

export const generateAccountList = (count: number): T_Account[] => {
  return Array.from({ length: count }, () => ({
    loginEmailAdress: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
    dateCreated: new Date(),
    lastDateActive: new Date(),
  }));
};
