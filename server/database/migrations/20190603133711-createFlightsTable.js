'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      departureTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      arrivalTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      departureAirportId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'airports',
          key: 'id'
        }
      },
      arrivalAirportId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'airports',
          key: 'id'
        }
      },
      luggageOverweightCost: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      isCancelled: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValut: false
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'airplanes',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('flights');
  }
};
