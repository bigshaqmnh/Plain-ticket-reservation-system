const statusCode = require('http-status-codes');

const airportController = require('../controllers/airport');

const getAll = async (req, res, next) => {
  const data = await airportController.getAll(req.query);

  if (!data) {
    res.sendStatus(statusCode.NO_CONTENT);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

const getById = async (req, res, next) => {
  const airportId = +req.params.airportId;
  const data = await airportController.getById(airportId);

  if (!data) {
    res.sendStatus(statusCode.NOT_FOUND);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

const add = async (req, res, next) => {
  const created = await airportController.add(req.body);

  res.status(statusCode.CREATED).json(created);
};

module.exports = { getAll, getById, add };
