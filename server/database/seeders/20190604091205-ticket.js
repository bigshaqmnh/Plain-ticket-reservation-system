'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('tickets', [
      {
        cost_id: 3,
        user_id: 'df198ce7-14de-4c7f-bfd5-b9b96f76ace5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cost_id: 5,
        user_id: '4af5fd33-c752-4e10-ab24-d5f5d54c433a',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('tickets', null, { truncate: true });
  }
};
