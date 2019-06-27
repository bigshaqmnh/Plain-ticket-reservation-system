const statusCode = require('http-status-codes');

const costController = require('../controllers/cost');

const getByFlightId = async (req, res, next) => {
  const flightId = +req.params.flightId;
  const data = await costController.getByFlightId(flightId);

  if (!data) {
    res.sendStatus(statusCode.NOT_FOUND);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

const add = async (req, res, next) => {
  await costController.add(req.body);

  res.sendStatus(statusCode.CREATED);
};

const update = async (req, res, next) => {
  await costController.update(req.params.costId, req.body);

  res.sendStatus(statusCode.OK);
};

module.exports = { getByFlightId, add, update };
