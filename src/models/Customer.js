module.exports = (sequelize, DataTypes) =>
  sequelize.define("Customer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    deliveryZoneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
