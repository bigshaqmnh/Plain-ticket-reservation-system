'use strict';

const genSeatId = () => Math.round(Math.random() * (360 - 1) + 1);

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('costs', [
      {
        cost: 200,
        flight_id: 1,
        seat_id: genSeatId(),
        luggage_option_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cost: 300,
        flight_id: 2,
        seat_id: genSeatId(),
        luggage_option_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cost: 400,
        flight_id: 5,
        seat_id: genSeatId(),
        luggage_option_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cost: 500,
        flight_id: 3,
        seat_id: genSeatId(),
        luggage_option_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cost: 600,
        flight_id: 4,
        seat_id: genSeatId(),
        luggage_option_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cost: 700,
        flight_id: 6,
        seat_id: genSeatId(),
        luggage_option_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('costs', null, { truncate: true });
  }
};
