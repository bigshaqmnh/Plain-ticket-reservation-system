const userService = require('../services/user');
const CustomError = require('../classes/CustomError');
const responseStatus = require('../constants/responseStatus');

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

    throw new CustomError({ status: responseStatus.conflict });
  } catch (err) {
    throw err instanceof CustomError ? err : CustomError(err);
  }
};

const signUp = async ({ username, email, password }) => {
  try {
    const user = await userService.checkIfExists(email);

    if (user) {
      throw new CustomError({ status: responseStatus.conflict });
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
    throw err instanceof CustomError ? err : CustomError(err);
  }
};

module.exports = { logIn, signUp };
