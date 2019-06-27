const statusCode = require('http-status-codes');

const authController = require('../controllers/auth');

const logIn = async (req, res, next) => {
  const data = await authController.logIn(req.body);

  if (!data) {
    res.sendStatus(statusCode.UNAUTHORIZED);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

const signUp = async (req, res, next) => {
  const data = await authController.signUp(req.body);

  if (!data) {
    res.sendStatus(statusCode.BAD_REQUEST);
  } else {
    res.status(statusCode.OK).json(data);
  }
};

module.exports = { logIn, signUp };
