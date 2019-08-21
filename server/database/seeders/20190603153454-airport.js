'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('airports', [
      {
        name: 'Arezzo Airport',
        country: 'Italy',
        city: 'Arezzo',
        latitude: 43.457964,
        longitude: 11.848347,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arlanda Airport',
        country: 'Sweden',
        city: 'Stockholm',
        latitude: 59.648979,
        longitude: 17.92934,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Warsaw Modlin Airport',
        country: 'Poland',
        city: 'Warsaw',
        latitude: 52.446303,
        longitude: 20.651271,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cairo International Airport',
        country: 'Egypt',
        city: 'Cairo',
        latitude: 30.111473,
        longitude: 31.396703,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Airport Bremen',
        country: 'Germany',
        city: 'Bremen',
        latitude: 53.052296,
        longitude: 8.785955,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tokyo International Airport',
        country: 'Japan',
        city: 'Tokyo',
        latitude: 35.548637,
        longitude: 139.784075,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John F. Kennedy International Airport',
        country: 'USA',
        city: 'New York',
        latitude: 40.714534,
        longitude: -74.286152,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'San Diego International Airport',
        country: 'USA',
        city: 'San Diego',
        latitude: 32.733805,
        longitude: -117.195492,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('airports', null, { truncate: true });
  }
};
