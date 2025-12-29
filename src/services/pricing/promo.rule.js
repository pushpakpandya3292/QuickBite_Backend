module.exports = class PromotionPricingRule {
  apply(pricingResult, pricingContext) {

    const promotions = pricingContext.promotions;
    const isFirstOrder = pricingContext.isFirstOrder;

    if (!Array.isArray(promotions)) {
      return pricingResult;
    }

    for (const promotion of promotions) {

      if (
        promotion.promotionType === "FIRST_ORDER" &&
        isFirstOrder === true
      ) {
        const promotionConfig =
          typeof promotion.configuration === "string"
            ? JSON.parse(promotion.configuration)
            : promotion.configuration;

        const discountPercentage =
          promotionConfig.discountPercentage;

        const discountAmount =
          (pricingResult.fee * discountPercentage) / 100;

        pricingResult.fee -= discountAmount;
        pricingResult.breakdown.firstOrderDiscount = discountAmount;
      }
    }

    return pricingResult;
  }
};
