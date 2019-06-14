const userService = require('../services/user');
const AuthResponse = require('../classes/AuthResponse');
const { reqError, dbError } = require('../constants/errors');

const logIn = async ({ email, password }) => {
  try {
    const user = await userService.findByEmail(email);

    if (user) {
      const passwordsMatch = await userService.comparePasswords(password, user.passwordHash);

      if (passwordsMatch) {
        const token = await userService.generateToken({ email });

        return new AuthResponse(false, `Bearer ${token}`);
      }
    }

    return new AuthResponse(true, reqError.logIn);
  } catch (err) {
    return new AuthResponse(true, dbError.logIn);
  }
};

const signUp = async ({ username, email, password }) => {
  try {
    const user = await userService.checkIfExists(email);

    if (user) {
      return new AuthResponse(true, reqError.signUp);
    }

    const passwordHash = await userService.hashPassword(password);

    const newUser = {
      username,
      email,
      passwordHash
    };

    await userService.add(newUser);
    const token = await userService.generateToken({ email });

    return new AuthResponse(false, `Bearer ${token}`);
  } catch (err) {
    return new AuthResponse(true, dbError.signUp);
  }
};

module.exports = { logIn, signUp };
