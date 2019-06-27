const statusCode = require('http-status-codes');

const seatController = require('../controllers/seat');

const getByAirplaneId = async (req, res, next) => {
  const airplaneId = +req.params.airplaneId;
  const data = await seatController.getByAirplaneId(airplaneId);

  if (!data) {
    res.sendStatus(statusCode.NOT_FOUND);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

const add = async (req, res, next) => {
  await seatController.add(req.body);

  res.sendStatus(statusCode.CREATED);
};

const update = async (req, res, next) => {
  await seatController.update(req.params.seatId, req.body);

  res.sendStatus(statusCode.OK);
};

module.exports = { getByAirplaneId, add, update };
