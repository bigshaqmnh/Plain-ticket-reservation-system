const responseStatus = require('../constants/responseStatus');

const controllerHandler = (controller, params) => async (req, res, next) => {
  const boundParams = params(req, res, next);

  try {
    const data = await controller(boundParams);

    return data ? res.status(responseStatus.ok).json(data) : res.sendStatus(responseStatus.ok);
  } catch (err) {
    console.error(err);

    return res.sendStatus(err.status || responseStatus.fatal);
  }
};

module.exports = controllerHandler;
