'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('luggage_types', [
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
    return queryInterface.bulkDelete('luggage_types', null, { truncate: true });
  }
};
