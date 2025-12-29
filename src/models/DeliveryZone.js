module.exports = (sequelize, DataTypes) =>
  sequelize.define("DeliveryZone", {
    name: {
      type: DataTypes.ENUM("URBAN", "SUBURBAN", "REMOTE"),
      allowNull: false,
      unique: true
    },
    baseDeliveryFee: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    perKilometerRate: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
