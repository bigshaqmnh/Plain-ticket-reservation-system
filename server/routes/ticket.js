var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const ticketController = require('../controllers/ticket');
const hasRights = require('../middleware/checkRights');

router.get('/', controllerHandler(ticketController.getByUserId, (req, res, next) => req.query));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => hasRights(req, res, next),
  controllerHandler(ticketController.add, (req, res, next) => req.body)
);

router.put(
  '/:ticketId',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => hasRights(req, res, next),
  controllerHandler(ticketController.update, (req, res, next) => ({ id: req.params.ticketId, ticket: req.body }))
);

module.exports = router;
