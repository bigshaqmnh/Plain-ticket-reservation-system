'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      departure_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      landing_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      max_free_luggage: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      overweight_cost: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('flights');
  }
};
