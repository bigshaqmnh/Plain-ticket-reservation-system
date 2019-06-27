const statusCode = require('http-status-codes');

const hasAdminRights = (req, res, next) => (req.user.isAdmin ? next() : res.sendStatus(statusCode.FORBIDDEN));

module.exports = hasAdminRights;
