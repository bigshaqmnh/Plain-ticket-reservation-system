const statusCode = require('http-status-codes');

const status = {
  success: {
    GET: statusCode.OK,
    POST: statusCode.CREATED,
    PUT: statusCode.NO_CONTENT
  },
  fail: {
    GET: statusCode.BAD_REQUEST,
    POST: statusCode.CONFLICT,
    PUT: statusCode.CONFLICT,
    ACCESS: statusCode.FORBIDDEN,
    DB: statusCode.SERVICE_UNAVAILABLE,
    SERVER: statusCode.INTERNAL_SERVER_ERROR
  }
};

module.exports = status;
