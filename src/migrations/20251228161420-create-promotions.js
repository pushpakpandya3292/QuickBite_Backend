'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Promotions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      promotionType: {
        type: Sequelize.ENUM(
          "FIRST_ORDER",
          "ZONE_DISCOUNT",
          "RESTAURANT_DISCOUNT"
        ),
        allowNull: false
      },
      configuration: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Promotions");
  }
};

