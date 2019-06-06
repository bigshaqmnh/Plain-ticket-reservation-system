'use strict';

const genSeatTypeId = () => Math.round(Math.random() * (2 - 1) + 1);
const genCost = () => Math.round(Math.random() * (400 - 100) + 100);

const generateCosts = () => {
  const costs = [];
  for (let i = 1; i <= 6; ++i) {
    const cost = genCost();
    for (let j = 1; j <= 6; ++j) {
      costs.push({
        cost: cost * j,
        flightId: i,
        seatTypeId: genSeatTypeId(),
        luggageOptionId: j,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
  return costs;
};

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('costs', generateCosts());
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('costs', null, { truncate: true });
  }
};
