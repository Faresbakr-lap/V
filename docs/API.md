# API Documentation

Base URL: `http://localhost:4000/api`

## Authentication
- `POST /auth/register`
- `POST /auth/login`

## Listings
- `GET /listings` (advanced filters: country, minFollowers, maxFollowers, minEngagement, maxEngagement, verified, rightsManager, monetization, category, minPrice, maxPrice)
- `GET /listings/featured`
- `GET /listings/:id`
- `POST /listings` (seller/admin)
- `PATCH /listings/:id`
- `DELETE /listings/:id`

## AI Recommendations
- `POST /recommendations/events` logs browsing behavior (`VIEW`,`CLICK`,`FAVORITE`) with dwell duration
- `GET /recommendations` returns ranked recommendations via weighted behavior scoring

## Social
- `GET /social/favorites`
- `POST /social/favorites/toggle`
- `GET /social/messages`
- `POST /social/messages`
- `POST /social/reviews`

## Payments
- `POST /payments/checkout`
  - Stripe mode when key exists
  - Mock successful order when Stripe key missing
