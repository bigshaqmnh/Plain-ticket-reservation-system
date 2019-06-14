const status = require('../constants/status');
const ControllerError = require('../classes/ControllerError');
const ServiceError = require('../classes/ServiceError');

const controllerHandler = (controller, params) => async (req, res, next) => {
  const boundParams = params(req, res, next);
  const method = req.method;

  try {
    const data = await controller(boundParams);

    return data ? res.status(status.success[method]).json(data) : res.sendStatus(status.success[method]);
  } catch (err) {
    console.error(err);
    if (err instanceof ControllerError) {
      return res.sendStatus(status.fail[method]);
    }

    if (err instanceof ServiceError) {
      return res.sendStatus(status.fail.DB);
    }

    return res.sendStatus(status.fail.SERVER);
  }
};

module.exports = controllerHandler;
