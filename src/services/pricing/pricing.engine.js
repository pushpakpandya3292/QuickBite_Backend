class PricingEngine {
  constructor(pricingRules) {
    this.pricingRules = pricingRules;
  }

  calculate(pricingContext) {
    const initialPricingResult = {
      fee: 0,
      breakdown: {}
    };

    return this.pricingRules.reduce(
      (pricingResult, pricingRule) => {
        return pricingRule.apply(pricingResult, pricingContext);
      },
      initialPricingResult
    );
  }
}

module.exports = PricingEngine;
