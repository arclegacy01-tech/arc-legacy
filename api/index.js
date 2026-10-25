import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

if (!process.env.VERCEL) {
  dotenv.config({ path: path.join(root, 'server', '.env') });
  dotenv.config({ path: path.join(root, '.env') });
}

const { default: app } = await import('../server/src/app.js');

// Vercel Node runtime runs Express apps via default export (no serverless-http)
export default app;
