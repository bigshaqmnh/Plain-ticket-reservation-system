const statusCode = require('http-status-codes');

const hasRights = (req, res, next) => (req.user.isAdmin ? next() : res.sendStatus(statusCode.FORBIDDEN));

module.exports = hasRights;
