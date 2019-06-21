const statusCode = require('http-status-codes');

const controllerHandler = (controller, params) => async (req, res, next) => {
  const boundParams = params(req, res, next);

  try {
    const data = await controller(boundParams);

    return data ? res.status(statusCode.OK).json(data) : res.sendStatus(statusCode.OK);
  } catch (err) {
    console.error(err);

    return res.sendStatus(err.status || statusCode.INTERNAL_SERVER_ERROR);
  }
};

module.exports = controllerHandler;
