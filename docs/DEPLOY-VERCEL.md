# Deploy ARC LEGACY on Vercel (single project)

> **Split frontend + API on two Vercel projects?** Use [DEPLOY-VERCEL-SPLIT.md](./DEPLOY-VERCEL-SPLIT.md) instead.

One Vercel project serves the **React storefront** (`client/dist`) and the **Express API** (`/api/*` via `api/index.js`).

For a **combined** `vercel.json`, merge root `vercel.json` (API) with client build settings from `client/vercel.json` and keep root as `.`.

## Prerequisites

- MongoDB Atlas cluster + `MONGODB_URI` (see [MONGODB-ATLAS.md](./MONGODB-ATLAS.md))
- GitHub repo **or** [Vercel CLI](https://vercel.com/docs/cli)
- Atlas **Network Access**: allow `0.0.0.0/0` (required for Vercel serverless)

## Option A — Deploy from GitHub (recommended)

### 1. Push code

```bash
git init -b main
git add .
git commit -m "Prepare ARC LEGACY for Vercel"
git remote add origin https://github.com/YOUR_USER/arc_website.git
git push -u origin main
```

Do **not** commit `server/.env` (secrets stay local + Vercel dashboard only).

### 2. Import on Vercel

1. [vercel.com/new](https://vercel.com/new) → Import your GitHub repo.
2. **Framework Preset:** Other (root `vercel.json` controls build).
3. **Root Directory:** `.` (repo root).
4. Build settings are read from `vercel.json`:
   - Install: `npm install`
   - Build: `npm run build -w client`
   - Output: `client/dist`

### 3. Environment variables

Add these for **Production** (and **Preview** if you want previews to work):

| Variable | Required | Notes |
|----------|----------|--------|
| `MONGODB_URI` | Yes | Atlas `mongodb+srv://.../arc_legacy?retryWrites=true&w=majority` |
| `JWT_SECRET` | Yes | Long random string |
| `CLIENT_URL` | Yes | `https://YOUR-PROJECT.vercel.app` (update after first deploy if URL changes) |
| `VITE_FIREBASE_API_KEY` | For Google login | From Firebase web app config |
| `VITE_FIREBASE_AUTH_DOMAIN` | For Google login | |
| `VITE_FIREBASE_PROJECT_ID` | For Google login | |
| `VITE_FIREBASE_STORAGE_BUCKET` | For Google login | |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | For Google login | |
| `VITE_FIREBASE_APP_ID` | For Google login | |
| `FIREBASE_PROJECT_ID` | For Google login | Service account |
| `FIREBASE_CLIENT_EMAIL` | For Google login | Service account |
| `FIREBASE_PRIVATE_KEY` | For Google login | Paste **one line** with `\n` for line breaks |
| `CLOUDINARY_CLOUD_NAME` | Optional | Admin uploads |
| `CLOUDINARY_API_KEY` | Optional | |
| `CLOUDINARY_API_SECRET` | Optional | |
| `CLOUDINARY_FOLDER` | Optional | Base folder only, e.g. `arc-legacy`. Each upload is stored in `{CLOUDINARY_FOLDER}/{category-slug}` and tagged `cat_{slug}`. The media library filters by the category saved in MongoDB. |
| `RAZORPAY_KEY_ID` | Optional | Checkout |
| `RAZORPAY_KEY_SECRET` | Optional | |
| `CORS_ORIGINS` | Optional | Extra origins, comma-separated |

`VITE_*` variables must be set on Vercel so the **build** embeds Firebase config in the client bundle.

### 4. Deploy

Click **Deploy**. When finished:

- Storefront: `https://YOUR-PROJECT.vercel.app`
- Health check: `https://YOUR-PROJECT.vercel.app/api/health`

### 5. Seed Atlas (once)

From your machine (not on Vercel):

```bash
MONGODB_URI="your-atlas-uri" JWT_SECRET="your-secret" npm run seed -w server
MONGODB_URI="your-atlas-uri" JWT_SECRET="your-secret" npm run seed:cms -w server
```

### 6. Firebase & Google Auth (production)

1. Firebase Console → **Authentication** → **Settings** → **Authorized domains** → add `YOUR-PROJECT.vercel.app`.
2. Redeploy after changing any `VITE_*` env var (rebuild required).

### 7. Razorpay (when ready)

- Use test keys until go-live.
- Add your Vercel domain in the Razorpay dashboard if required.

---

## Option B — Vercel CLI (no GitHub)

```bash
npm i -g vercel
cd /path/to/arc_website
vercel login
vercel          # first deploy (follow prompts)
vercel env add MONGODB_URI
# ... add other variables via CLI or dashboard
vercel --prod
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `/api/health` 500 | Check `MONGODB_URI`, Atlas IP allowlist, Vercel function logs |
| Google login works locally, not on Vercel | Set all `VITE_FIREBASE_*` + `FIREBASE_*` on Vercel; redeploy; add authorized domain |
| Blank page after deploy | Confirm build succeeded; check browser console |
| CORS errors | Set `CLIENT_URL` to exact production URL (with `https://`) |
| Admin uploads fail | Set `CLOUDINARY_*` env vars |

**Logs:** Vercel project → **Deployments** → deployment → **Functions** → `api/index.js` logs.
