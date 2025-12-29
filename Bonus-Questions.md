1️⃣ How would you handle bulk ordering (20+ items)?
Problem

Bulk orders increase:
Price calculation complexity
Database load
Risk of partial failures

Approach

a) Efficient item fetching
Fetch all items in one query instead of looping:
SELECT * FROM Items WHERE id IN (...)


b) Price aggregation in memory

Calculate base price using a single pass:
baseOrderPrice = Σ (itemPrice × quantity)


c) Database transactions

Wrap order creation in a transaction:
Create order
Create order items
Roll back everything if any step fails

d) Optional bulk discount rule

Add a pricing rule like:
“If total quantity > 20 → apply bulk discount”
This fits naturally into the existing pricing engine

Why this works?
Bulk orders are handled without changing architecture — only adding rules.

2️⃣ How would you handle distance calculation?
a) Google Maps API

Pros

Real road distance
Accounts for traffic, routes, one-way roads
Very accurate

Cons

API cost
Network latency
External dependency

Best use case

Production systems where accuracy > cost
ETA estimation

b) Haversine Formula

Pros

No external dependency
Very fast
Free
Deterministic

Cons

Straight-line distance (not road distance)

Best use case

Pricing approximation
Initial cost estimation

Chosen approach in this project:

Haversine is used for pricing because it is fast, predictable, and cost-free.
Google Maps can later be layered in for ETA without changing pricing architecture.

3️⃣ If a restaurant moves location, how do you update pricing logic?
Key Principle

Pricing logic should not depend on hard-coded coordinates.

Approach

Store restaurant latitude & longitude in DB
Always calculate distance dynamically at order time
When restaurant location changes:
Update restaurant’s coordinates in DB
No code changes required
New orders automatically reflect updated distance
Old orders remain unchanged (historical accuracy)

Why this is correct?

Pricing logic remains stateless
Database becomes the source of truth
No recomputation of historical data

4️⃣ How would you support multi-currency delivery fees?
Step-by-step approach

a) Store currency with zone

DeliveryZones:
- baseDeliveryFee
- perKilometerRate
- currency (e.g., INR, USD)


b) Pricing engine stays currency-agnostic

It only calculates numbers
Does not format or convert

c) Conversion layer

Convert fees using:
Exchange-rate service (cached)
Or pre-defined conversion table

d) Response formatting

{
  "deliveryFee": 48.5,
  "currency": "INR"
}