'use strict';

module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    }
  });

  ticket.associate = models => {
    ticket.belongsTo(models.cost);
    ticket.hasOne(models.seat);
    ticket.hasOne(models.user);
  };

  return ticket;
};
