# MongoDB Atlas setup (ARC LEGACY)

## 1. Create cluster

1. Sign in at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. **Create** a free **M0** cluster (any region close to your users).
3. Wait until the cluster status is **Active**.

## 2. Database user

1. **Database Access** → **Add New Database User**.
2. Authentication: **Password** (save the password securely).
3. Privileges: **Read and write to any database** (or restrict to `arc_legacy`).

## 3. Network access

1. **Network Access** → **Add IP Address**.
2. Local dev: **Add Current IP Address** (or `0.0.0.0/0` only for testing — not recommended for production).
3. Vercel / serverless: add `0.0.0.0/0` or use [Atlas VPC peering](https://www.mongodb.com/docs/atlas/security-vpc-peering/) for production.

## 4. Connection string

1. **Database** → **Connect** → **Drivers** → **Node.js**.
2. Copy the `mongodb+srv://...` URI.
3. Replace `<password>` with your DB user password (URL-encode special characters: `@` → `%40`, `#` → `%23`, etc.).
4. Set the database name in the path, e.g. `...mongodb.net/arc_legacy?retryWrites=true&w=majority`.

## 5. Project env

In `server/.env` (local) and **Vercel → Settings → Environment Variables** (production):

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/arc_legacy?retryWrites=true&w=majority
```

Restart the API after changing env vars.

## 6. Seed data (first time on Atlas)

From the repo root:

```bash
npm run seed -w server
npm run seed:cms -w server
```

Default admin (from seed): see `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` in `.env.example`.

## Verify connection

```bash
cd server && node -e "import 'dotenv/config'; import { connectDB } from './src/config/db.js'; await connectDB(); process.exit(0);"
```

You should see `MongoDB connected (arc_legacy @ ...)`.

## Troubleshooting

| Error | Fix |
|--------|-----|
| `MongoServerSelectionError` / timeout | Check **Network Access** IP allowlist; cluster not paused |
| `bad auth` | Wrong user/password; URL-encode password in URI |
| Empty storefront | Run `npm run seed -w server` on the Atlas database |
