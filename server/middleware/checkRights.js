const status = require('../constants/status');

const hasRights = (req, res, next) => (req.user.isAdmin ? next() : res.sendStatus(status.fail.ACCESS));

module.exports = hasRights;
