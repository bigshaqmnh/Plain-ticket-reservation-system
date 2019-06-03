'use strict';
module.exports = (sequelize, DataTypes) => {
  const seatType = sequelize.define('seat_type', {
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

  return seatType;
};
