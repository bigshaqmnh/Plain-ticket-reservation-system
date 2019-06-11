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
    departureTime: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: validateDate
    },
    arrivalTime: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: validateDate
    },
    luggageOverweightCost: {
      allowNull: false,
      type: DataTypes.DECIMAL,
      validate: validate.decimal
    },
    isCancelled: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValut: false
    }
  });

  flight.associate = models => {
    flight.belongsTo(models.airport, { as: 'departureAirport' });
    flight.belongsTo(models.airport, { as: 'arrivalAirport' });
    flight.belongsTo(models.airplane);
  };

  return flight;
};
