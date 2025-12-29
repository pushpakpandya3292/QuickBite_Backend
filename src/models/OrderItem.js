module.exports = (sequelize, DataTypes) =>
  sequelize.define("OrderItem", {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemPriceAtOrderTime: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
