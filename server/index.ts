import app from './src/app';
import { connectToDB } from './src/config/database.ts';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`);
  });
