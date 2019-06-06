'use strict';
const genSeatId = () => Math.round(Math.random() * (360 - 1) + 1);

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('tickets', [
      {
        seatId: genSeatId(),
        costId: 17,
        userId: 'c648c063-2e51-49c7-98b7-749154a0e43e',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        seatId: genSeatId(),
        costId: 9,
        userId: '4af5fd33-c752-4e10-ab24-d5f5d54c433a',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        seatId: genSeatId(),
        costId: 25,
        userId: 'c648c063-2e51-49c7-98b7-749154a0e43e',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('tickets', null, { truncate: true });
  }
};
