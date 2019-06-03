'use strict';
const validate = require('./validators/number');

module.exports = (sequelize, DataTypes) => {
  const airport = sequelize.define('airport', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING
    },
    latitude: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: validate.float
    },
    longitude: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: validate.float
    }
  });

  return airport;
};
