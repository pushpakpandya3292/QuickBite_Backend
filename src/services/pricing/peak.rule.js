module.exports = class PeakTimePricingRule {
  apply(pricingResult, pricingContext) {

    // If there is no active peak time rule, return as-is
    if (!pricingContext.peakTimeRule) {
      return pricingResult;
    }

    const peakMultiplier = pricingContext.peakTimeRule.multiplier;

    // Apply peak multiplier to the accumulated delivery fee
    pricingResult.fee = pricingResult.fee * peakMultiplier;

    // Store breakdown for transparency
    pricingResult.breakdown.peakTimeMultiplier = peakMultiplier;

    return pricingResult;
  }
};
