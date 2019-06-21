const userService = require('../services/user');
const CustomError = require('../classes/CustomError');
const error = require('../constants/error');

const logIn = async ({ email, password }) => {
  try {
    const user = await userService.findByEmail(email);

    if (user) {
      const passwordsMatch = await userService.comparePasswords(password, user.passwordHash);

      if (passwordsMatch) {
        const token = await userService.generateToken({ email });

        return `Bearer ${token}`;
      }
    }

    throw new CustomError({ type: error.USER_NOT_FOUND });
  } catch (err) {
    throw err instanceof CustomError ? err : new CustomError({ ...err, type: error.FAILED_TO_LOG_IN });
  }
};

const signUp = async ({ username, email, password }) => {
  try {
    const user = await userService.checkIfExists(email);

    if (user) {
      throw new CustomError({ type: error.USER_ALREADY_EXISTS });
    }

    const passwordHash = await userService.hashPassword(password);

    const newUser = {
      username,
      email,
      passwordHash
    };

    await userService.add(newUser);
    const token = await userService.generateToken({ email });

    return `Bearer ${token}`;
  } catch (err) {
    throw err instanceof CustomError ? err : new CustomError({ ...err, type: error.FAILED_TO_SIGN_UP });
  }
};

module.exports = { logIn, signUp };
