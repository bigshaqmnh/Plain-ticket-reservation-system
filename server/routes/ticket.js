var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const ticketController = require('../controllers/ticket');

router.get('/', controllerHandler(ticketController.getByUserId, (req, res, next) => req.query));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(ticketController.add, (req, res, next) => req.body)
);

router.post(
  '/:ticketId',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(ticketController.update, (req, res, next) => ({ id: req.params.ticketId, ticket: req.body }))
);

module.exports = router;
