const statusCode = require('http-status-codes');

const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params(req, res, next);

  try {
    const { err, data } = await promise(boundParams);

    if (err && data) {
      return res.status(data.status).json(data.message);
    } else if (data) {
      return res.status(statusCode.OK).json(data);
    }

    return res.sendStatus(statusCode.OK);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = controllerHandler;
