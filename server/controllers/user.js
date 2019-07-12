const userService = require('../services/user');

const getUserInfo = user => ({ data: { username: user.username, email: user.email } });

const update = (id, user) => userService.update(id, user);

module.exports = { getUserInfo, update };
