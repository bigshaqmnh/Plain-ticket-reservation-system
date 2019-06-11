'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('luggageTypes', [
      {
        name: 'Hand Luggage',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Suitcase',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('luggageTypes', null, { truncate: true });
  }
};
