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

const add = async (req, res, next) => {
  await airportController.add(req.body);

  res.sendStatus(statusCode.CREATED);
};

module.exports = { getAll, add };
