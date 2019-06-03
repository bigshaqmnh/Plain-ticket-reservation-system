'use strict';
const validate = require('./validators/number');

module.exports = (sequelize, DataTypes) => {
  const seat = sequelize.define('seat', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    row: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: validate.integer
    },
    seat: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: validate.integer
    },
    floor: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: validate.integer
    }
  });

  seat.associate = models => {
    seat.belongsTo(models.airplane);
    seat.belongsTo(models.seat_type);
  };

  return seat;
};
