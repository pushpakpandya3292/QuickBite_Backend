const {
  Customer,
  Restaurant,
  Item,
  Order,
  DeliveryZone,
  Promotion,
  PeakRule
} = require("../models");

const calculateDistanceKm = require("../utils/haversine");

const PricingEngine = require("./pricing/pricing.engine");
const ZonePricingRule = require("./pricing/zone.rule");
const PeakTimeRule = require("./pricing/peak.rule");
const PromotionRule = require("./pricing/promo.rule");

const { Op } = require("sequelize");

exports.createOrder = async (orderRequest) => {

  // 1. Fetch customer
  const customer = await Customer.findByPk(orderRequest.customerId);
  if (!customer) {
    throw new Error("Customer not found");
  }

  // 2. Fetch restaurant
  const restaurant = await Restaurant.findByPk(orderRequest.restaurantId);
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  // 3. Fetch delivery zone
  const deliveryZone = await DeliveryZone.findByPk(customer.deliveryZoneId);
  if (!deliveryZone) {
    throw new Error("Delivery zone not found");
  }

  // 4. Calculate distance
  const distanceKm = calculateDistanceKm(
    customer.latitude,
    customer.longitude,
    restaurant.latitude,
    restaurant.longitude
  );

  // 5. Calculate base price
  let baseOrderPrice = 0;
  for (const itemRequest of orderRequest.items) {
    const item = await Item.findByPk(itemRequest.itemId);
    if (!item) {
      throw new Error(`Item ${itemRequest.itemId} not found`);
    }
    baseOrderPrice += item.price * itemRequest.qty;
  }

  // 6. Determine peak time
  const orderDate = new Date(orderRequest.placedAt);
  const orderHour = orderDate.getHours();
  const dayOfWeek = orderDate.getDay(); // 0 = Sunday, 6 = Saturday
  const orderDateString = orderDate.toISOString().split("T")[0];

  const peakRules = await PeakRule.findAll();

  let applicablePeakRule = null;

  for (const peakRule of peakRules) {

    // Holiday check
    if (Array.isArray(peakRule.holidayDates)) {
      if (peakRule.holidayDates.includes(orderDateString)) {
        applicablePeakRule = peakRule;
        break;
      }
    }

    // Weekend check
    if (peakRule.appliesOnWeekends === true) {
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        applicablePeakRule = peakRule;
        break;
      }
    }

    // Time range check
    if (
      orderHour >= peakRule.startHour &&
      orderHour <= peakRule.endHour
    ) {
      applicablePeakRule = peakRule;
      break;
    }
  }


  // 7. Fetch active promotions
  const activePromotions = await Promotion.findAll({
    where: { isActive: true }
  });

  // 8. Check if first order
  const isFirstOrder =
    (await Order.count({ where: { customerId: customer.id } })) === 0;

  // 9. Pricing engine
  const pricingEngine = new PricingEngine([
    new ZonePricingRule(),
    new PeakTimeRule(),
    new PromotionRule()
  ]);

  const pricingResult = pricingEngine.calculate({
    distanceKm: distanceKm,
    zone: deliveryZone,
    peakTimeRule: applicablePeakRule,
    promotions: activePromotions,
    isFirstOrder: isFirstOrder
  });


  const deliveryFee = Number(pricingResult.fee || 0);
  const totalOrderPrice = baseOrderPrice + deliveryFee;


  console.log("PRICING CONTEXT:", {
    distanceKm,
    zone: deliveryZone,
    peakTimeRule: applicablePeakRule,
    promotions: activePromotions,
    isFirstOrder
  });

  console.log("PRICING RESULT:", pricingResult);


  // 10. Create order
  const order = await Order.create({
    customerId: customer.id,
    restaurantId: restaurant.id,
    baseOrderPrice: baseOrderPrice,
    deliveryFee: deliveryFee,
    totalOrderPrice: totalOrderPrice,
    pricingBreakdown: pricingResult.breakdown
  });

  return order;
};
