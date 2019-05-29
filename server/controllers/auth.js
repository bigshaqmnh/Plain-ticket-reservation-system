const userService = require('../services/user');
const Auth = require('../classes/Auth');
const error = require('../constants/errors');

const logIn = async (email, password) => {
  const user = await userService.findUser('email', email);

  if (user) {
    const hasAccess = await userService.comparePasswords(password, user.password);

    if (hasAccess) {
      const { id, username } = user;
      const payload = {
        id,
        username
      };

      const token = await userService.generateToken(payload);

      return new Auth(false, `Bearer ${token}`);
    }
  }

  return new Auth(true, error.logIn);
};

module.exports = { logIn };
