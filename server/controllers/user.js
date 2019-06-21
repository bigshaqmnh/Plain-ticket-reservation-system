const userService = require('../services/user');

const update = async ({ id, user }) => {
  try {
    await userService.update(id, user);
  } catch (err) {
    throw err;
  }
};

module.exports = { update };
