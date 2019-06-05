'use strict';
module.exports = (sequelize, DataTypes) => {
  const seatType = sequelize.define('seatType', {
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

  return seatType;
};
