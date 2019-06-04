'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('luggage_sizes', [
      {
        dimensions: '30 x 20 x 15 cm',
        max_weight: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dimensions: '40 x 30 x 20 cm',
        max_weight: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dimensions: '50 x 40 x 20 cm',
        max_weight: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dimensions: '60 x 45 x 25 cm',
        max_weight: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dimensions: '70 x 50 x 30',
        max_weight: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('luggage_sizes', null, { truncate: true });
  }
};
