'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('luggageSizes', [
      {
        dimensions: '30 x 20 x 15 cm',
        maxWeight: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dimensions: '40 x 30 x 20 cm',
        maxWeight: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dimensions: '50 x 40 x 20 cm',
        maxWeight: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dimensions: '60 x 45 x 25 cm',
        maxWeight: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dimensions: '70 x 50 x 30',
        maxWeight: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dimensions: '80 x 55 x 35',
        maxWeight: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('luggageSizes', null, { truncate: true });
  }
};
