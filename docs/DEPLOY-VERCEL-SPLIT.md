# Split deploy: Frontend + API on two Vercel projects

Use **two Vercel projects** from the **same GitHub repo**.

| Project | Vercel root directory | Config file | URL example |
|---------|----------------------|-------------|-------------|
| **Frontend** (storefront) | `client` | `client/vercel.json` | `https://arc-legacy.vercel.app` |
| **API** (Express) | `.` (repo root) | `vercel.json` | `https://arc-legacy-api.vercel.app` |

---

## 1. API project (backend)

1. Vercel → **Add New Project** → same repo.
2. **Project name:** e.g. `arc-legacy-api`.
3. **Root Directory:** `.` (repository root — **not** `client`).
4. Framework: **Other** (uses root `vercel.json`).
5. **Environment variables** (no `VITE_*` needed here):

| Variable | Example |
|----------|---------|
| `MONGODB_URI` | Atlas connection string |
| `JWT_SECRET` | long random string |
| `CLIENT_URL` | `https://YOUR-FRONTEND.vercel.app` |
| `CORS_ORIGINS` | optional extra origins (comma-separated) |
| `FIREBASE_PROJECT_ID` | |
| `FIREBASE_CLIENT_EMAIL` | |
| `FIREBASE_PRIVATE_KEY` | one line with `\n` |
| `CLOUDINARY_*` | if using uploads |
| `RAZORPAY_*` | if using payments |

6. Deploy → test: `https://YOUR-API.vercel.app/api/health` → `{ "ok": true }`.

---

## 2. Frontend project (storefront)

1. **Add New Project** → same repo again (second project).
2. **Project name:** e.g. `arc-legacy`.
3. **Root Directory:** `client` ← **required** (Edit in Settings → General if wrong).
4. Uses `client/vercel.json` — `npm run build` → `dist/`.
5. **Do not** use repo root (`.`) for the frontend project — that uses API `vercel.json` and the site will not build.

### Frontend build failed?

| Symptom | Fix |
|---------|-----|
| Log shows commit `94de47c` only / no `client/vercel.json` | `git push origin main`, then **Redeploy** |
| `install` at repo root, no `dist` output | Set **Root Directory** to `client` |
| Blank site, API 404 on same URL | Frontend and API must be **two projects** |
| Products never load | Set `VITE_API_URL=https://YOUR-API.vercel.app/api` and redeploy |
5. **Environment variables** (build-time):

| Variable | Example |
|----------|---------|
| `VITE_API_URL` | `https://YOUR-API.vercel.app/api` |
| `VITE_FIREBASE_API_KEY` | |
| `VITE_FIREBASE_AUTH_DOMAIN` | |
| `VITE_FIREBASE_PROJECT_ID` | |
| `VITE_FIREBASE_STORAGE_BUCKET` | |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | |
| `VITE_FIREBASE_APP_ID` | |

6. Deploy → open frontend URL → login / products should load from API.

---

## 3. Fix your existing single project

If you already deployed **everything in one project**:

1. **Option A:** Delete that project and create the two projects above.
2. **Option B:** Keep one as frontend: set **Root Directory** to `client`, remove API env from it, add `VITE_API_URL`. Create second project for API at repo root.

---

## 4. Firebase & CORS

- **Firebase** → Authorized domains: add **frontend** domain only (`YOUR-FRONTEND.vercel.app`).
- **API** `CLIENT_URL` must match frontend URL exactly (`https://...`, no trailing slash).
- After changing `VITE_API_URL` or `CLIENT_URL`, **redeploy** both projects.

---

## 5. Local development

```bash
npm run dev
```

- Client: `http://localhost:5173` (proxy `/api` → `localhost:5050`).
- No `VITE_API_URL` needed locally.

---

## 6. Seed database (once)

```bash
MONGODB_URI="..." JWT_SECRET="..." npm run seed -w server
```
