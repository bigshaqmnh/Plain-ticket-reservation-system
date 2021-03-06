const statusCode = require('http-status-codes');

const airplaneController = require('../controllers/airplane');

const getAll = async (req, res, next) => {
  const data = await airplaneController.getAll(req.query);

  if (!data) {
    res.sendStatus(statusCode.NO_CONTENT);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

const getById = async (req, res, next) => {
  const airplaneId = +req.params.airplaneId;
  const data = await airplaneController.getById(airplaneId);

  if (!data) {
    res.sendStatus(statusCode.NOT_FOUND);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

const add = async (req, res, next) => {
  const created = await airplaneController.add(req.body);

  res.status(statusCode.CREATED).json(created);
};

module.exports = { getAll, getById, add };
