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

const add = async (req, res, next) => {
  await airplaneController.add(req.body);

  res.sendStatus(statusCode.CREATED);
};

module.exports = { getAll, add };
