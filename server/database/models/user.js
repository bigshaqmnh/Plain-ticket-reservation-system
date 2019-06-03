'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password_hash: {
      allowNull: false,
      type: DataTypes.STRING
    },
    is_admin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return user;
};
