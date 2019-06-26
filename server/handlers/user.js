const statusCode = require('http-status-codes');

const userController = require('../controllers/user');

const update = async (req, res, next) => {
  await userController.update(req.user.id, req.body);

  res.sendStatus(statusCode.OK);
};

module.exports = { update };
