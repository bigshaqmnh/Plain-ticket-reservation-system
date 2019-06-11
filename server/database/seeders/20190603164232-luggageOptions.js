'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('luggageOptions', [
      {
        name: 'Economy',
        luggageTypeId: 1,
        luggageSizeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Economy Plus',
        luggageTypeId: 1,
        luggageSizeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tourist',
        luggageTypeId: 2,
        luggageSizeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tourist Plus',
        luggageTypeId: 2,
        luggageSizeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Business',
        luggageTypeId: 2,
        luggageSizeId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Business Plus',
        luggageTypeId: 2,
        luggageSizeId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('luggageOptions', null, { truncate: true });
  }
};
