'use strict';
module.exports = (sequelize, DataTypes) => {
  const seatType = sequelize.define('seatType', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });

  return seatType;
};
