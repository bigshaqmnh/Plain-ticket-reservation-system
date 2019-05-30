const userService = require('../services/user');
const AuthResponse = require('../classes/AuthResponse');
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

      return new AuthResponse(false, `Bearer ${token}`);
    }
  }

  return new AuthResponse(true, error.logIn);
};

module.exports = { logIn };
