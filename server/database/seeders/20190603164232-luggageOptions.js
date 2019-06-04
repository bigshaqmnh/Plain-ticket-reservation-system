'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('luggage_options', [
      {
        name: 'Economy',
        luggage_type_id: 1,
        luggage_size_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Economy Plus',
        luggage_type_id: 1,
        luggage_size_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tourist',
        luggage_type_id: 2,
        luggage_size_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tourist Plus',
        luggage_type_id: 2,
        luggage_size_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Business',
        luggage_type_id: 2,
        luggage_size_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('luggage_sizes', null, { truncate: true });
  }
};
