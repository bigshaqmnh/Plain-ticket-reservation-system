var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const flightController = require('../controllers/flight');
const hasRights = require('../middleware/checkRights');

router.get('/all', controllerHandler(flightController.getAll, (req, res, next) => req.query));

router.get('/', controllerHandler(flightController.getAllByParams, (req, res, next) => req.body));

router.get('/:flightId', controllerHandler(flightController.getById, (req, res, next) => req.params));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => hasRights(req, res, next),
  controllerHandler(flightController.add, (req, res, next) => req.body)
);

router.put(
  '/:flightId',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => hasRights(req, res, next),
  controllerHandler(flightController.update, (req, res, next) => ({ id: req.params.flightId, flight: req.body }))
);

module.exports = router;
