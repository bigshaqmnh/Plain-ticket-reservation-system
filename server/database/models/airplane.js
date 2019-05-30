'use strict';
const validate = require('./validators/number');

module.exports = (sequelize, DataTypes) => {
  const airplane = sequelize.define('airplane', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    photo: {
      allowNull: true,
      type: DataTypes.BLOB
    },
    max_people_amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: validate.integer
    },
    max_luggage_weight: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: validate.float
    },
    seats: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.UUID)
    }
  });

  airplane.associate = models => {
    airplane.belongsTo(models.airport);
  };

  return airplane;
};
