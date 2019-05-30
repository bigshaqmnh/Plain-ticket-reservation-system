'use strict';
const validate = require('./validators/number');

module.exports = (sequelize, DataTypes) => {
  const airport = sequelize.define('airport', {
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
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    latitude: {
      allowNull: true,
      type: DataTypes.FLOAT,
      validate: validate.float
    },
    longitude: {
      allowNull: true,
      type: DataTypes.FLOAT,
      validate: validate.float
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT
    }
  });

  return airport;
};
