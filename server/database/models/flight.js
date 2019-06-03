'use strict';
const validate = require('./validators/number');
const validateDate = { isDate: true };

module.exports = (sequelize, DataTypes) => {
  const flight = sequelize.define('flight', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    departure_time: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: validateDate
    },
    arrival_time: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: validateDate
    },
    departure_airport_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: validate.integer
    },
    arrival_airport_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: validate.integer
    },
    luggage_overweight_cost: {
      allowNull: false,
      type: DataTypes.DECIMAL,
      validate: validate.decimal
    },
    is_cancelled: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValut: false
    }
  });

  flight.associate = models => {
    flight.belongsTo(models.airport);
    flight.belongsTo(models.airplane);
  };

  return flight;
};
