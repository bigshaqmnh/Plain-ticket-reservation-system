'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('airplanes', [
      {
        name: 'Airbus A320',
        type: 'A320',
        maxLuggageCarryWeight: 38458.83,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Boeing 737-800',
        type: 'B738',
        maxLuggageCarryWeight: 45827.36,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Embraer ERJ-190',
        type: 'E190',
        maxLuggageCarryWeight: 15738.53,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Canadair Regional Jet CRJ-700',
        type: 'CRJ7',
        maxLuggageCarryWeight: 29374.78,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Boeing 747-8',
        type: 'B748',
        maxLuggageCarryWeight: 31574.58,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Airbus A318',
        type: 'A318',
        maxLuggageCarryWeight: 35419.92,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('airplanes', null, { truncate: true });
  }
};
