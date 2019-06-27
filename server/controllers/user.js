const userService = require('../services/user');

const update = (id, user) => userService.update(id, user);

module.exports = { update };
