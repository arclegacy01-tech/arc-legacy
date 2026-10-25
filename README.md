# ARC LEGACY E-commerce (MERN)

Premium laces & trims storefront with admin panel — Phase 1 (retail core).

## Stack

- **Client:** React + Vite + Tailwind CSS
- **Server:** Node.js + Express + MongoDB (Mongoose)
- **Planned:** Vercel deploy, Cloudinary media, Razorpay payments

## Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

## Setup

```bash
cp .env.example server/.env
# Edit server/.env: MONGODB_URI (Atlas or local), JWT_SECRET

npm install
npm run seed
npm run dev
```

**MongoDB Atlas:** step-by-step guide in [docs/MONGODB-ATLAS.md](docs/MONGODB-ATLAS.md).

- Storefront: http://localhost:5173  
- API: http://localhost:5050 (5050 avoids macOS AirPlay on port 5000)  
- Admin: http://localhost:5173/admin (use seed admin credentials)

## Phase 1 scope

- Home, category PLP with filters, product detail, cart
- Register / login (JWT)
- Admin: product CRUD, orders list

## Phase 2 scope

- Checkout with saved/manual address, order success page
- Account hub: orders (filter, detail, cancel), addresses, settings, notifications
- Wishlist (guest + logged-in sync), recently viewed on wishlist
- Track order (order # + email), contact form, Our Story, policy pages

## Phase 3 scope

- CMS API: banners, announcements, FAQs, homepage sections, blog posts
- Admin **Content** hub: manage all of the above + view contact messages
- Storefront: dynamic hero carousel, promo band, top bar, FAQs on contact, `/blog`
- Seed CMS: `npm run seed:cms -w server` (skips if banners already exist)

## Phase 4 scope

- **Wholesale** landing page + enquiry form; admin enquiry inbox
- **Razorpay** checkout (prepare → pay → verify); COD unchanged
- **Cloudinary** signed upload in admin (products & banners)
- **Vercel** — `vercel.json` + `api/index.js` serverless API; deploy guide: [docs/DEPLOY-VERCEL.md](docs/DEPLOY-VERCEL.md)
