var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const ticketController = require('../controllers/ticket');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(ticketController.getByUserId, (req, res, next) => ({ ...req.query, userId: req.user.id }))
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(ticketController.add, (req, res, next) => req.body)
);

router.put(
  '/:ticketId',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(ticketController.update, (req, res, next) => ({ id: req.params.ticketId, ticket: req.body }))
);

module.exports = router;
