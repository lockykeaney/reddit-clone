import * as dotenv from 'dotenv';
dotenv.config();

import createApp from './app';
import createDatabase from './database';

const PORT = process.env.PORT || 4000;

const main = async () => {
  try {
    const app = createApp();
    createDatabase();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
