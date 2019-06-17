const seatService = require('../services/seat');

const getByAirplaneId = async ({ airplaneId }) => {
  try {
    const seats = await seatService.findByAirplaneId(airplaneId);

    return seats;
  } catch (err) {
    throw err;
  }
};

const add = async seat => {
  try {
    await seatService.add(seat);
  } catch (err) {
    throw err;
  }
};

const update = async ({ id, seat }) => {
  try {
    await seatService.update(id, seat);
  } catch (err) {
    throw err;
  }
};

module.exports = { getByAirplaneId, add, update };
