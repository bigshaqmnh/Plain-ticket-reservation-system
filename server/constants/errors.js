const statusCode = require('http-status-codes');

const error = {
  logIn: { status: statusCode.UNAUTHORIZED, message: 'Unable to log in. Check your credentials.' }
};

module.exports = error;
