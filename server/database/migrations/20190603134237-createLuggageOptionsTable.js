'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('luggageOptions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      luggageTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'luggageTypes',
          key: 'id'
        }
      },
      luggageSizeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'luggageSizes',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('luggageOptions');
  }
};
