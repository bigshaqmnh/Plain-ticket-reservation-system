var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const airportController = require('../controllers/airport');

router.get('/', controllerHandler(airportController.getAirports, (req, res, next) => req.query));

router.get('/:airportId', controllerHandler(airportController.getAirportById, (req, res, next) => req.params));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(airportController.addAirport, (req, res, next) => req.body)
);

module.exports = router;
