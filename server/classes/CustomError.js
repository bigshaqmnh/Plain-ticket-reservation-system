const responseStatus = require('../constants/responseStatus');

class CustomError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status || responseStatus.fatal;
  }
}

module.exports = CustomError;
