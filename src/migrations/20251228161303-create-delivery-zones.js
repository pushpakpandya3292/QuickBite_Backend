'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("DeliveryZones", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.ENUM("URBAN", "SUBURBAN", "REMOTE"),
        allowNull: false,
        unique: true
      },
      baseDeliveryFee: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      perKilometerRate: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("DeliveryZones");
  }
};
