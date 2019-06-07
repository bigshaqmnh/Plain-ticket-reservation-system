var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const flightsController = require('../controllers/flight');

router.get('/', controllerHandler(flightsController.getFlights, (req, res, next) => req.query));

router.get('/:flightId', controllerHandler(flightsController.getFlightById, (req, res, next) => req.params));

router.get('/:flightId', controllerHandler(flightsController.getFlightById, (req, res, next) => req.params));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(flightsController.addFlight, (req, res, next) => req.body)
);

module.exports = router;
