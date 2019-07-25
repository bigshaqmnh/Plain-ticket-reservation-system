const statusCode = require('http-status-codes');

const userController = require('../controllers/user');

const getInfo = async (req, res, next) => {
  if (!req.user) {
    res.sendStatus(statusCode.NOT_FOUND);
  }

  const user = await userController.getUserInfo(req.user);
  const photo = await userController.getUserPhoto(req.user.id);

  const data = {
    data: {
      ...user,
      photo
    }
  };

  res.status(statusCode.OK).json(data);
};

const update = async (req, res, next) => {
  await userController.update(req.user.id, req.body);

  res.sendStatus(statusCode.OK);
};

module.exports = { update, getInfo };
