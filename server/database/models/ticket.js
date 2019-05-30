'use strict';
const validate = require('./validators/number');

module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    cost: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: validate.float
    },
    is_paid: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  ticket.associate = models => {
    ticket.belongsTo(models.flight);
    ticket.hasOne(models.seat);
    ticket.hasOne(models.luggage);
    ticket.belongsTo(models.user);
  };

  return ticket;
};
