'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('seatTypes', [
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
    return queryInterface.bulkDelete('seatTypes', null, { truncate: true });
  }
};
