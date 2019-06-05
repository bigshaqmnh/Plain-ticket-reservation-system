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
      flightId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'flights',
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
      luggageOptionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'luggageOptions',
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
