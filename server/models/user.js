'use strict';
var validate = require('./validators/user');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: validate.email
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: validate.password
    },
    is_admin: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return user;
};
