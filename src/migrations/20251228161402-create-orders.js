'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Customers",
          key: "id"
        }
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Restaurants",
          key: "id"
        }
      },
      baseOrderPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      deliveryFee: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      totalOrderPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      pricingBreakdown: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Orders");
  }
};

