const statusCode = require('http-status-codes');

module.exports = {
  conflict: statusCode.CONFLICT,
  forbidden: statusCode.FORBIDDEN,
  badReqest: statusCode.BAD_REQUEST,
  unavailable: statusCode.SERVICE_UNAVAILABLE,
  notFound: statusCode.NOT_FOUND
};
