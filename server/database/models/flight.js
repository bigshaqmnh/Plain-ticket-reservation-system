'use strict';
const validate = require('./validators/number');

module.exports = (sequelize, DataTypes) => {
  const flight = sequelize.define('flight', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    departure_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    landing_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    max_free_luggage: {
      allowNull: true,
      type: DataTypes.FLOAT,
      validate: validate.float
    },
    overweight_cost: {
      allowNull: true,
      type: DataTypes.FLOAT,
      validate: validate.integer
    }
  });

  flight.associate = models => {
    flight.belongsTo(models.airport);
    flight.belongsTo(models.airplane);
  };

  return flight;
};
