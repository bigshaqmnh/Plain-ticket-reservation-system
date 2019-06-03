'use strict';
const validate = require('./validators/number');

module.exports = (sequelize, DataTypes) => {
  const luggageSize = sequelize.define('luggage_size', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    dimensions: {
      allowNull: false,
      type: DataTypes.STRING
    },
    max_weight: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: validate.float
    }
  });

  return luggageSize;
};
