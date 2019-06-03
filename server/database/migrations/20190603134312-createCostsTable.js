'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('costs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      cost: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      flight_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'flights',
          key: 'id'
        }
      },
      seat_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'seats',
          key: 'id'
        }
      },
      luggage_option_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'luggage_options',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('costs');
  }
};
