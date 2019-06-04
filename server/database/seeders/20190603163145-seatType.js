'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('seat_types', [
      {
        name: 'Economy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Business',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('seat_types', null, { truncate: true });
  }
};
