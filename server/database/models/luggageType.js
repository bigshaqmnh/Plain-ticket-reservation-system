'use strict';

module.exports = (sequelize, DataTypes) => {
  const luggageType = sequelize.define('luggage_type', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });

  return luggageType;
};
