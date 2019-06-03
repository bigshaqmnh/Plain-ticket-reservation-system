'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('luggage_options', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      luggage_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'luggage_types',
          key: 'id'
        }
      },
      luggage_size_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'luggage_sizes',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('luggage_options');
  }
};
