'use strict';
const validate = require('./validators/number');

module.exports = (sequelize, DataTypes) => {
  const cost = sequelize.define('cost', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    cost: {
      allowNull: false,
      type: DataTypes.DECIMAL,
      validate: validate.decimal
    }
  });

  cost.associate = models => {
    cost.belongsTo(models.flight);
    cost.belongsTo(models.seat);
    cost.belongsTo(models.luggageOption);
  };

  return cost;
};
