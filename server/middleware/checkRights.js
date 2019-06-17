const responseStatus = require("../constants/responseStatus");

const hasRights = (req, res, next) =>
  req.user.isAdmin ? next() : res.sendStatus(responseStatus.forbidden);

module.exports = hasRights;
