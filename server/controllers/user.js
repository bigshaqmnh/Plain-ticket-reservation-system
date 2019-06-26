const userService = require('../services/user');

const update = async (id, user) => await userService.update(id, user);

module.exports = { update };
