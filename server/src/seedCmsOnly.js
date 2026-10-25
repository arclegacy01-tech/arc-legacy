import 'dotenv/config';
import { connectDB } from './config/db.js';
import { seedCms } from './seedCms.js';

connectDB()
  .then(() => seedCms())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
