'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PeakRules", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      startHour: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      endHour: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      multiplier: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("PeakRules");
  }
};
