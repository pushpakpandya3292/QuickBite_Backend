module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("PeakRules", "appliesOnWeekends", {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    await queryInterface.addColumn("PeakRules", "holidayDates", {
      type: Sequelize.JSONB,
      allowNull: true
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("PeakRules", "holidayDates");
    await queryInterface.removeColumn("PeakRules", "appliesOnWeekends");
  }
};
