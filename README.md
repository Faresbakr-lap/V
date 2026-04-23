# Fares Bakr Marketplace

Production-ready full-stack platform for buying and selling Facebook Pages with AI-driven recommendations.

## Stack
- **Frontend:** React + TailwindCSS + Vite
- **Backend:** Node.js + Express
- **Database:** PostgreSQL + Prisma
- **Auth:** JWT
- **Payments:** Stripe (mock fallback)
- **Uploads:** Cloudinary-ready config

## Core Modules
- Homepage with premium CTA + trust indicators
- Marketplace with advanced filters
- Listing detail with analytics + audience insights
- Seller dashboard (CRUD starter)
- Auth with role support (buyer/seller/admin)
- Payments checkout endpoint
- Messaging and reviews
- Favorites
- **AI recommendations from browsing behavior events**

## Quick Start
```bash
npm install
cp server/.env.example server/.env
npm run dev
```

## Environment (`server/.env`)
See `server/.env.example`.

## Deploy
- Frontend: Vercel
- Backend: AWS ECS / Render / Railway
- DB: AWS RDS / Neon

## Security
- Helmet
- CORS policy
- Rate limiting
- XSS sanitization
- Input validation with express-validator
- Prisma ORM to mitigate SQL injection risk

See API details in `docs/API.md`.
