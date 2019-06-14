const reqError = {
  logIn: 'User not found. Check your credentials.',
  singUp: 'User with such email already exists.'
};

const dbError = {
  logIn: 'Unable to log in.',
  singUp: 'Unable to sign up.',
  get: 'Unable to get data.',
  create: 'Unable to create new instance.',
  update: 'Unable to update the instance.'
};

module.exports = { reqError, dbError };
