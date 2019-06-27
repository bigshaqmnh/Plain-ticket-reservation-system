const statusCode = require('http-status-codes');

const ticketController = require('../controllers/ticket');

const getByUserId = async (req, res, next) => {
  const data = await ticketController.getByUserId({ ...req.query, userId: req.user.id });

  if (!data) {
    res.sendStatus(statusCode.NO_CONTENT);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

const add = async (req, res, next) => {
  await ticketController.add(req.body);

  res.sendStatus(statusCode.CREATED);
};

module.exports = { getByUserId, add };
