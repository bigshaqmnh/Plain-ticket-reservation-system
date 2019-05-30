'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('airplanes', 'airport_id', {
        type: Sequelize.UUID,
        references: {
          model: 'airports',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.addColumn('flights', 'airport_id', {
        type: Sequelize.UUID,
        references: {
          model: 'airports',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.addColumn('flights', 'airplane_id', {
        type: Sequelize.UUID,
        references: {
          model: 'airplanes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.addColumn('luggage', 'luggage_type_id', {
        type: Sequelize.UUID,
        references: {
          model: 'luggageTypes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.addColumn('seats', 'seat_type_id', {
        type: Sequelize.UUID,
        references: {
          model: 'seatTypes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.addColumn('seats', 'airplane_id', {
        type: Sequelize.UUID,
        references: {
          model: 'airplanes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.addColumn('tickets', 'flight_id', {
        type: Sequelize.UUID,
        references: {
          model: 'flights',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.addColumn('tickets', 'seat_id', {
        type: Sequelize.UUID,
        references: {
          model: 'seats',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.addColumn('tickets', 'luggage_id', {
        type: Sequelize.UUID,
        references: {
          model: 'luggage',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.addColumn('tickets', 'user_id', {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('airplane', 'airport_id'),
      queryInterface.removeColumn('flights', 'airport_id'),
      queryInterface.removeColumn('flights', 'airplane_id'),
      queryInterface.removeColumn('luggages', 'luggage_type_id'),
      queryInterface.removeColumn('seats', 'seat_type_id'),
      queryInterface.removeColumn('seats', 'airplane_id'),
      queryInterface.removeColumn('tickets', 'flight_id'),
      queryInterface.removeColumn('tickets', 'seat_id'),
      queryInterface.removeColumn('tickets', 'luggage_id'),
      queryInterface.removeColumn('tickets', 'user_id')
    ]);
  }
};
