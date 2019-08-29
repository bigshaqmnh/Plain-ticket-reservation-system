'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('flights', [
      {
        departureTime: new Date(2019, 8, 5, 13, 46),
        arrivalTime: new Date(2019, 8, 5, 16, 27),
        departureAirportId: 2,
        arrivalAirportId: 3,
        luggageOverweightCost: 40,
        isCancelled: false,
        airplaneId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departureTime: new Date(2019, 8, 6, 0, 1),
        arrivalTime: new Date(2019, 2, 5, 1, 46),
        departureAirportId: 5,
        arrivalAirportId: 1,
        luggageOverweightCost: 30,
        isCancelled: false,
        airplaneId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departureTime: new Date(2019, 8, 4, 23, 59),
        arrivalTime: new Date(2019, 6, 17, 13, 23),
        departureAirportId: 4,
        arrivalAirportId: 3,
        luggageOverweightCost: 25,
        isCancelled: false,
        airplaneId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departureTime: new Date(2019, 10, 17, 7, 7),
        arrivalTime: new Date(2019, 10, 17, 10, 34),
        departureAirportId: 2,
        arrivalAirportId: 6,
        luggageOverweightCost: 50,
        isCancelled: false,
        airplaneId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departureTime: new Date(2019, 4, 8, 17, 9),
        arrivalTime: new Date(2019, 4, 8, 19, 53),
        departureAirportId: 3,
        arrivalAirportId: 5,
        luggageOverweightCost: 43,
        isCancelled: false,
        airplaneId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departureTime: new Date(2019, 8, 12, 15, 17),
        arrivalTime: new Date(2019, 8, 12, 20, 19),
        departureAirportId: 4,
        arrivalAirportId: 1,
        luggageOverweightCost: 28,
        isCancelled: false,
        airplaneId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departureTime: new Date(2019, 8, 12, 9, 24),
        arrivalTime: new Date(2019, 8, 12, 16, 8),
        departureAirportId: 4,
        arrivalAirportId: 1,
        luggageOverweightCost: 34,
        isCancelled: false,
        airplaneId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        departureTime: new Date(2019, 8, 25, 9, 24),
        arrivalTime: new Date(2019, 8, 25, 16, 8),
        departureAirportId: 1,
        arrivalAirportId: 4,
        luggageOverweightCost: 38,
        isCancelled: false,
        airplaneId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('flights', null, { truncate: true });
  }
};
