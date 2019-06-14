const status = require('../constants/status');
const CustomError = require('../classes/CustomError');

const controllerHandler = (controller, params) => async (req, res, next) => {
  const boundParams = params(req, res, next);
  const method = req.method;

  try {
    const data = await controller(boundParams);

    if (data instanceof CustomError) {
      console.error('ERROR: ', data.message);
      return data.dbError ? res.sendStatus(status.fail.DB) : res.sendStatus(status.fail[method]);
    }

    return data ? res.status(status.success[method]).json(data) : res.sendStatus(status.success[method]);
  } catch (err) {
    console.error(err);
    return res.sendStatus(status.fail.SERVER);
  }
};

module.exports = controllerHandler;
