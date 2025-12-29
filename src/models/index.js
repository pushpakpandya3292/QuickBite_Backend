const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Customer = require("./Customer")(sequelize, DataTypes);
const Restaurant = require("./Restaurant")(sequelize, DataTypes);
const Item = require("./Item")(sequelize, DataTypes);
const DeliveryZone = require("./DeliveryZone")(sequelize, DataTypes);
const Order = require("./Order")(sequelize, DataTypes);
const OrderItem = require("./OrderItem")(sequelize, DataTypes);
const Promotion = require("./Promotion")(sequelize, DataTypes);
const PeakRule = require("./PeakRule")(sequelize, DataTypes);

// Relationships
Customer.belongsTo(DeliveryZone, { foreignKey: "deliveryZoneId" });

Restaurant.hasMany(Item, { foreignKey: "restaurantId" });
Item.belongsTo(Restaurant, { foreignKey: "restaurantId" });

Order.belongsTo(Customer, { foreignKey: "customerId" });
Order.belongsTo(Restaurant, { foreignKey: "restaurantId" });
Order.hasMany(OrderItem, { foreignKey: "orderId" });

OrderItem.belongsTo(Order, { foreignKey: "orderId" });
OrderItem.belongsTo(Item, { foreignKey: "itemId" });

module.exports = {
  sequelize,
  Customer,
  Restaurant,
  Item,
  DeliveryZone,
  Order,
  OrderItem,
  Promotion,
  PeakRule
};
