'use strict';

const getRandAirplaneId = () => Math.round(Math.random() * (6 - 1) + 1);
const getRandSeatTypeId = () => Math.round(Math.random() * (2 - 1) + 1);
const getRandFloor = () => Math.round(Math.random() * (2 - 1) + 1);
const getRandIsBooked = () => (Math.random() > 0.6 ? true : false);

const generateSeats = () => {
  const indexes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  let seats = [];

  for (let row = 1, max_row = 40; row <= max_row; ++row) {
    for (let index = 0, max_index = indexes.length; index < max_index; ++index) {
      seats.push({
        row,
        seat: indexes[index],
        floor: getRandFloor(),
        airplaneId: getRandAirplaneId(),
        seatTypeId: getRandSeatTypeId(),
        isBooked: getRandIsBooked(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }

  return seats;
};

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('seats', generateSeats());
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('seats', null, { truncate: true });
  }
};
