const responseStatus = require('../constants/responseStatus');

class CustomError extends Error {
  constructor({ status, message }) {
    super(message);
    this.name = 'CustomError';
    this.status = status || responseStatus.badReqest;
  }
}

module.exports = CustomError;
