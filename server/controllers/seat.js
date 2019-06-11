const seatService = require('../services/seat');
const SeatResponse = require('../classes/SeatResponse');
const { dbError } = require('../constants/errors');

const getByAirplaneId = async ({ airplaneId }) => {
  try {
    const seats = await seatService.findByAirplaneId(airplaneId);

    return new SeatResponse(false, seats);
  } catch (err) {
    return new SeatResponse(true, dbError.get);
  }
};

const add = async seat => {
  try {
    await seatService.add(seat);

    return new SeatResponse();
  } catch (err) {
    return new SeatResponse(true, dbError.create);
  }
};

const update = async ({ id, seat }) => {
  try {
    await seatService.update(id, seat);

    return new SeatResponse();
  } catch (err) {
    return new SeatResponse(true, dbError.update);
  }
};

module.exports = { getByAirplaneId, add, update };
