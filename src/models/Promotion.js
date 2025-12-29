module.exports = (sequelize, DataTypes) =>
  sequelize.define("Promotion", {
    promotionType: {
      type: DataTypes.ENUM(
        "FIRST_ORDER",
        "ZONE_DISCOUNT",
        "RESTAURANT_DISCOUNT"
      ),
      allowNull: false
    },
    configuration: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
