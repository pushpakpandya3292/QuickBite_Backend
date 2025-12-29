# -----------------------------
# QuickBite –Food Delivery System
# -----------------------------


# Setup Instructions
# -----------------------------
npm install
configure .env
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start

# -----------------------------
# Overview
# -----------------------------

QuickBite is a backend service designed to handle dynamic food delivery pricing in a scalable and extensible way.
The system addresses real-world delivery challenges such as:

Late deliveries for far-away customers

Flat pricing that ignores delivery difficulty

Rigid coupon-based promotions

This backend solves these problems using a rule-based pricing engine, distance-aware logic, and database-driven configurations, all testable via Postman.

# -----------------------------
# Tech Stack
# -----------------------------

Node.js
Express.js
PostgreSQL
Sequelize ORM
Sequelize CLI (migrations & seeders)

# -----------------------------
# Architecture
# -----------------------------
Client (Postman)
      ↓
Controller (HTTP handling)
      ↓
Service Layer (Business logic)
      ↓
Pricing Engine (Rule-based)
      ↓
Database (PostgreSQL)

# -----------------------------
# Node.js
# -----------------------------
node version - 20.19.1

# -----------------------------
# Quickbite-Code structure
# -----------------------------
QuickBite_Backend/
│
├── README.md                  # Project explanation & approach
├── package.json               # Dependencies & scripts
├── package-lock.json
├── .env                       # Environment variable template
├── .gitignore
├── .sequelizerc               # Sequelize CLI config
│
├── src/
│   │
│   ├── server.js              # App entry point
│   │
│   ├── config/
│   │   ├── config.js          # Sequelize CLI DB config
│   │   └── database.js        # Sequelize instance
│   │
│   ├── models/
│   │   ├── index.js           # Model initialization & relations
│   │   ├── Customer.js
│   │   ├── Restaurant.js
│   │   ├── Item.js
│   │   ├── DeliveryZone.js
│   │   ├── Order.js
│   │   ├── OrderItem.js
│   │   ├── Promotion.js
│   │   └── PeakRule.js
│   │
│   ├── migrations/
│   │   ├── 001-create-delivery-zones.js
│   │   ├── 002-create-customers.js
│   │   ├── 003-create-restaurants.js
│   │   ├── 004-create-items.js
│   │   ├── 005-create-orders.js               # Sequilize Migrations
│   │   ├── 006-create-order-items.js
│   │   ├── 007-create-promotions.js
│   │   └── 008-create-peak-rules.js
│   │
│   ├── seeders/
│   │   └── 001-seed-all-data.js
│   │   
│   ├── routes/
│   │   └── order.routes.js
│   │
│   ├── controllers/
│   │   └── order.controller.js
│   │
│   ├── services/
│   │   ├── order.service.js
│   │   │
│   │   └── pricing/
│   │       ├── pricing.engine.js
│   │       ├── zone.rule.js
│   │       ├── peak.rule.js
│   │       └── promo.rule.js
│   │
│   └── utils/
│       └── haversine.js        # Distance calculation
│
└── node_modules/               # Ignored in git


# -----------------------------
# API Endpoints
# -----------------------------

Health Check

GET /health

Create Order

POST /api/v1/orders

Sample request:

{
  "customerId": 1,
  "restaurantId": 1,
  "placedAt": "2025-01-01T20:00:00Z",
  "items": [
    { "itemId": 1, "qty": 2 }
  ]
}

Get Order

GET  /api/v1/orders/:id

# -----------------------------
# Problems & Solutions
# -----------------------------

1️⃣ Late Deliveries for Far Customers

Problem: Customers located far away were treated the same as nearby customers.

Solution:
Distance is calculated using the Haversine formula
Customers are assigned delivery zones (Urban, Suburban, Remote)
Each zone defines:
Base delivery fee
Per-kilometer rate

Result: Farther customers automatically incur higher delivery fees, reflecting delivery effort.

2️⃣ Pricing Ignores Distance & Difficulty

Problem: Flat pricing does not scale with distance.

Solution: Zone-based pricing formula:
deliveryFee = baseDeliveryFee + (distanceKm × perKilometerRate)
Each order stores a pricingBreakdown object to keep pricing transparent.

3️⃣ Basic Coupon-Based Promotions

Problem: Coupon logic is rigid and not scalable.

Solution:
Promotions are implemented as pricing rules
Promotion rules are stored in the database
No coupon codes are required
Example:
First-order discount applied automatically





