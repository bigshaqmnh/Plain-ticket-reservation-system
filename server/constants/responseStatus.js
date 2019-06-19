const statusCode = require('http-status-codes');

module.exports = {
  ok: statusCode.OK,
  conflict: statusCode.CONFLICT,
  unauthorized: statusCode.UNAUTHORIZED,
  forbidden: statusCode.FORBIDDEN,
  badReqest: statusCode.BAD_REQUEST,
  notFound: statusCode.NOT_FOUND,
  fatal: statusCode.INTERNAL_SERVER_ERROR
};
