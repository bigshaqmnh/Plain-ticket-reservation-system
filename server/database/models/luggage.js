'use strict';
const validate = require('./validators/number');

module.exports = (sequelize, DataTypes) => {
  const luggage = sequelize.define('luggage', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    weight: {
      allowNull: true,
      type: DataTypes.FLOAT,
      validate: validate.float
    }
  });

  luggage.associate = models => {
    luggage.belongsTo(models.luggageType);
  };

  return luggage;
};
