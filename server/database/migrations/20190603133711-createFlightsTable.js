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
      departure_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      arrival_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      departure_airport_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      arrival_airport_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      luggage_overweight_cost: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      is_cancelled: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValut: false
      },
      airport_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'airports',
          key: 'id'
        }
      },
      airplane_id: {
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
