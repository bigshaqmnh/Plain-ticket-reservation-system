'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('seats', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      row: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      seat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      floor: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      airplane_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'airplanes',
          key: 'id'
        }
      },
      seat_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'seat_types',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('seats');
  }
};
