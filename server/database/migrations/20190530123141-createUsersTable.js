'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_admin: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      tickets: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.UUID)
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('users');
  }
};
