const error = require('../constants/errors');

const hasRights = (req, res, next) => (req.user.isAdmin ? next() : res.sendStatus(error.forbidden));

module.exports = hasRights;
