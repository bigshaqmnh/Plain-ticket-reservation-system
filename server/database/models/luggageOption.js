'use strict';

module.exports = (sequelize, DataTypes) => {
  const luggageOption = sequelize.define('luggage_option', {
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

  luggageOption.associate = models => {
    luggageOption.belongsTo(models.luggage_type);
    luggageOption.belongsTo(models.luggage_size);
  };

  return luggageOption;
};