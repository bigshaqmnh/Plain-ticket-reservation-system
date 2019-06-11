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
      isBooked: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'airplanes',
          key: 'id'
        }
      },
      seatTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'seatTypes',
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
