import * as dotenv from 'dotenv';
dotenv.config();

import createApp from './app';
import createDatabase from './database';

const PORT = process.env.PORT || 4000;

const start = async () => {
  console.log('Loading with config: ', process.env);
  try {
    const app = createApp();
    createDatabase();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
