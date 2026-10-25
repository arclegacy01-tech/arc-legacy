import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import serverless from 'serverless-http';
import app from '../server/src/app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Local `vercel dev` / tests: load secrets from server/.env
if (!process.env.VERCEL) {
  dotenv.config({ path: path.join(root, 'server', '.env') });
  dotenv.config({ path: path.join(root, '.env') });
}

export default serverless(app);
