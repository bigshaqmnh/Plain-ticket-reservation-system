const statusCode = require('http-status-codes');

const reqError = {
  logIn: { status: statusCode.CONFLICT, message: 'User not found. Check your credentials.' },
  signUp: { status: statusCode.CONFLICT, message: 'User with such email already exists.' }
};

const dbError = {
  logIn: { status: statusCode.SERVICE_UNAVAILABLE, message: 'Unable to log in.' },
  signUp: { status: statusCode.SERVICE_UNAVAILABLE, message: 'Unable to sign up.' },
  get: { status: statusCode.SERVICE_UNAVAILABLE, message: 'Unable to get data.' },
  create: { status: statusCode.SERVICE_UNAVAILABLE, message: 'Unable to create new instance.' },
  update: { status: statusCode.SERVICE_UNAVAILABLE, message: 'Unable to update the instance.' }
};

module.exports = { reqError, dbError };
