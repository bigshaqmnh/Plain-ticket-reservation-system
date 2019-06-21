const statusCode = require('http-status-codes');

class CustomError extends Error {
  constructor({ type, message }) {
    super(message);
    this.status = type || statusCode.INTERNAL_SERVER_ERROR;
  }
}

module.exports = CustomError;
