'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('airplanes', [
      {
        name: 'Airbus A320',
        type: 'A320',
        max_luggage_carry_weight: 38458.83,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Boeing 737-800',
        type: 'B738',
        max_luggage_carry_weight: 45827.36,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Embraer ERJ-190',
        type: 'E190',
        max_luggage_carry_weight: 15738.53,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Canadair Regional Jet CRJ-700',
        type: 'CRJ7',
        max_luggage_carry_weight: 29374.78,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Boeing 747-8',
        type: 'B748',
        max_luggage_carry_weight: 31574.58,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Airbus A318',
        type: 'A318',
        max_luggage_carry_weight: 35419.92,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('airplanes', null, { truncate: true });
  }
};
