module.exports = (sequelize, DataTypes) =>
  sequelize.define("Order", {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    baseOrderPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    deliveryFee: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    totalOrderPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    pricingBreakdown: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  });
