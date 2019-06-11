'use strict';
const validate = require('./validators/number');

module.exports = (sequelize, DataTypes) => {
  const airplane = sequelize.define('airplane', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    maxLuggageCarryWeight: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: validate.float
    }
  });

  return airplane;
};
