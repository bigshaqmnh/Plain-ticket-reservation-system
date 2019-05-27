const userService = require('../../services/auth');
const createError = require('http-errors');

const logIn = async (email, password) => {
  const user = await userService.findUserByEmail(email);

  if (user) {
    const hasAccess = await userService.comparePasswords(password, user.password);

    if (hasAccess) {
      const { id, username } = user;
      const payload = {
        id,
        username
      };

      const token = await userService.generateToken(payload);

      return `Bearer ${token}`;
    }
  }
  return createError(401, 'User with such credentials wasnt found');
};

module.exports = { logIn };
