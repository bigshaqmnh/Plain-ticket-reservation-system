const statusCode = require('http-status-codes');

const luggageOptionController = require('../controllers/luggageOption');

const getAll = async (req, res, next) => {
  const data = await luggageOptionController.getAll();

  if (!data) {
    res.sendStatus(statusCode.NO_CONTENT);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

const getById = async (req, res, next) => {
  const luggageOptionId = +req.params.luggageOptionId;
  const data = await luggageOptionController.getById(luggageOptionId);

  if (!data) {
    res.sendStatus(statusCode.NOT_FOUND);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

module.exports = { getAll, getById };
