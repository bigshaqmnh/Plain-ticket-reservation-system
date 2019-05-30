'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('airplanes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      photo: {
        allowNull: true,
        type: Sequelize.BLOB
      },
      max_people_amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      max_luggage_weight: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      seats: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.UUID)
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('airplanes');
  }
};
