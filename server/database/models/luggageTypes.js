'use strict';
const validate = require('./validators/number');

module.exports = (sequelize, DataTypes) => {
  const luggageType = sequelize.define('luggageType', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    max_weight: {
      allowNull: true,
      type: DataTypes.FLOAT,
      validate: validate.float
    }
  });

  return luggageType;
};
