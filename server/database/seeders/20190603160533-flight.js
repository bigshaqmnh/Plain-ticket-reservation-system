'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('flights', [
      {
        departure_time: new Date(2019, 8, 5, 13, 46),
        arrival_time: new Date(2019, 8, 5, 16, 27),
        departure_airport_id: 2,
        arrival_airport_id: 3,
        luggage_overweight_cost: 40,
        is_cancelled: false,
        airport_id: 2,
        airplane_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departure_time: new Date(2019, 2, 4, 21, 12),
        arrival_time: new Date(2019, 2, 5, 1, 46),
        departure_airport_id: 5,
        arrival_airport_id: 1,
        luggage_overweight_cost: 30,
        is_cancelled: false,
        airport_id: 5,
        airplane_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departure_time: new Date(2019, 6, 17, 10, 58),
        arrival_time: new Date(2019, 6, 17, 13, 23),
        departure_airport_id: 4,
        arrival_airport_id: 3,
        luggage_overweight_cost: 25,
        is_cancelled: false,
        airport_id: 4,
        airplane_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departure_time: new Date(2019, 10, 17, 7, 7),
        arrival_time: new Date(2019, 10, 17, 10, 34),
        departure_airport_id: 2,
        arrival_airport_id: 6,
        luggage_overweight_cost: 50,
        is_cancelled: false,
        airport_id: 2,
        airplane_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departure_time: new Date(2019, 4, 8, 17, 9),
        arrival_time: new Date(2019, 4, 8, 19, 53),
        departure_airport_id: 3,
        arrival_airport_id: 5,
        luggage_overweight_cost: 43,
        is_cancelled: false,
        airport_id: 3,
        airplane_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departure_time: new Date(2019, 7, 12, 15, 17),
        arrival_time: new Date(2019, 7, 12, 20, 19),
        departure_airport_id: 4,
        arrival_airport_id: 1,
        luggage_overweight_cost: 28,
        is_cancelled: false,
        airport_id: 4,
        airplane_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('flights', null, { truncate: true });
  }
};
