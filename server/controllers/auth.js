const userService = require('../services/user');

const logIn = async ({ email, password }) => {
  const user = await userService.findByEmail(email);

  if (!user) {
    return;
  }

  const passwordsMatch = await userService.comparePasswords(password, user.passwordHash);

  if (passwordsMatch) {
    const token = await userService.generateToken({ email });

    return token;
  }
};

const signUp = async ({ username, email, password }) => {
  const userExists = await userService.checkIfExists(email);

  if (userExists) {
    return;
  }

  const passwordHash = await userService.hashPassword(password);

  const newUser = {
    username,
    email,
    passwordHash
  };

  await userService.add(newUser);
  const token = await userService.generateToken({ email });

  return token;
};

module.exports = { logIn, signUp };
