const statusCode = require('http-status-codes');

const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];

  try {
    const { err, data } = await promise(...boundParams);

    return err ? res.status(data.status).json(data.message) : res.status(statusCode.OK).json(data);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = controllerHandler;
