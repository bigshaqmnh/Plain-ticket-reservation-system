const seatService = require('../services/seat');

const getByAirplaneId = async airplaneId => await seatService.findByAirplaneId(airplaneId);

const add = async seat => await seatService.add(seat);

const update = async (id, seat) => await seatService.update(id, seat);

module.exports = { getByAirplaneId, add, update };
