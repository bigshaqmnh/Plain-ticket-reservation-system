'use strict';
const validate = require('./validators/number');

module.exports = (sequelize, DataTypes) => {
  const luggageSize = sequelize.define('luggageSize', {
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
    maxWeight: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: validate.float
    }
  });

  return luggageSize;
};
