'use strict';

module.exports = (sequelize, DataTypes) => {
  const luggageOption = sequelize.define('luggageOption', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  });

  luggageOption.associate = models => {
    luggageOption.belongsTo(models.luggageType);
    luggageOption.belongsTo(models.luggageSize);
  };

  return luggageOption;
};
