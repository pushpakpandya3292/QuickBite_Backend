module.exports = (sequelize, DataTypes) =>
  sequelize.define("PeakRule", {
    startHour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    endHour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    multiplier: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    appliesOnWeekends: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    holidayDates: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  });
