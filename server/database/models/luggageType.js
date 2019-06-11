'use strict';

module.exports = (sequelize, DataTypes) => {
  const luggageType = sequelize.define('luggageType', {
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
    }
  });

  return luggageType;
};
