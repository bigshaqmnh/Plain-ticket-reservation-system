'use strict';
module.exports = (sequelize, DataTypes) => {
  const seat = sequelize.define('seat', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    is_booked: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  seat.associate = models => {
    seat.belongsTo(models.seatType);
    seat.belongsTo(models.airplane);
  };

  return seat;
};
