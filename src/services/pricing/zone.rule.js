module.exports = class ZoneBasedPricingRule {
  apply(pricingResult, pricingContext) {

    const deliveryZone = pricingContext.zone;
    const distanceInKilometers = pricingContext.distanceKm;

    if (!deliveryZone) {
      return pricingResult;
    }

    const baseDeliveryFee = deliveryZone.baseDeliveryFee;
    const perKilometerRate = deliveryZone.perKilometerRate;

    const zoneDeliveryFee =
      baseDeliveryFee + (distanceInKilometers * perKilometerRate);

    pricingResult.fee += zoneDeliveryFee;
    pricingResult.breakdown.zoneDeliveryFee = zoneDeliveryFee;

    return pricingResult;
  }
};
