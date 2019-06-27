const seatService = require('../services/seat');

const getByAirplaneId = airplaneId => seatService.findByAirplaneId(airplaneId);

const add = seat => seatService.add(seat);

const update = (id, seat) => seatService.update(id, seat);

module.exports = { getByAirplaneId, add, update };
