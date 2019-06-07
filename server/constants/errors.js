const statusCode = require('http-status-codes');

const reqError = {
  logIn: { status: statusCode.UNAUTHORIZED, message: 'Unable to log in. Check your credentials.' }
};

const dbError = {
  get: { status: statusCode.SERVICE_UNAVAILABLE, message: 'Unable to get data.' },
  create: { status: statusCode.SERVICE_UNAVAILABLE, message: 'Unable to create new instance.' }
};

module.exports = { reqError, dbError };
