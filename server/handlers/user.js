const statusCode = require('http-status-codes');

const userController = require('../controllers/user');

const getInfo = (req, res, next) => {
  if (!req.user) {
    res.sendStatus(statusCode.NOT_FOUND);
  }

  const { username, email } = req.user;

  res.status(statusCode.OK).json({ username, email });
};

const update = async (req, res, next) => {
  await userController.update(req.user.id, req.body);

  res.sendStatus(statusCode.OK);
};

module.exports = { update, getInfo };
