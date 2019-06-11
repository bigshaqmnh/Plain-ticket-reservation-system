'use strict';

const seat = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
const seat_index = [3, 5, 7, 8];

const getRandMaxRow = () => Math.round(Math.random() * (40 - 20) + 20);
const getRandMaxIndex = () => Math.round(Math.random() * 3);
const getRandSeatTypeId = () => Math.round(Math.random() * (2 - 1) + 1);
const getRandMaxFloor = () => Math.round(Math.random() * (2 - 1) + 1);
const getRandIsBooked = () => (Math.random() > 0.6 ? true : false);

const generateSeats = () => {
  let seats = [];

  for (let airplaneId = 1, maxAirplaneId = 6; airplaneId <= maxAirplaneId; ++airplaneId) {
    for (let floor = 1, max_floor = getRandMaxFloor(); floor <= max_floor; ++floor) {
      for (let row = 1, max_row = getRandMaxRow(); row <= max_row; ++row) {
        for (let index = 0, max_index = seat_index[getRandMaxIndex()]; index <= max_index; ++index) {
          seats.push({
            row,
            seat: seat[index],
            floor,
            airplaneId,
            seatTypeId: getRandSeatTypeId(),
            isBooked: getRandIsBooked(),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }
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
