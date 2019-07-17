const statusCode = require('http-status-codes');

const flightController = require('../controllers/flight');

const getAll = async (req, res, next) => {
  const data = await flightController.getAll(req.query);

  if (!data) {
    res.sendStatus(statusCode.NO_CONTENT);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

const getById = async (req, res, next) => {
  const flightId = +req.params.flightId;
  const data = await flightController.getById(flightId);

  if (!data) {
    res.sendStatus(statusCode.NOT_FOUND);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

const getByParams = async (req, res, next) => {
  const data = await flightController.getByParams(req.query);

  if (!data) {
    res.sendStatus(statusCode.NO_CONTENT);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

const add = async (req, res, next) => {
  const created = await flightController.add(req.body);

  res.status(statusCode.CREATED).json(created);
};

const update = async (req, res, next) => {
  await flightController.update(req.params.flightId, req.body);

  res.sendStatus(statusCode.OK);
};

module.exports = { getAll, getByParams, getById, add, update };
