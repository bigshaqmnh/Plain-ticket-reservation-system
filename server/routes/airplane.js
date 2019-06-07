var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const airplaneController = require('../controllers/airplane');

router.get('/', controllerHandler(airplaneController.getAirplanes, (req, res, next) => req.query));

router.get('/:airplaneId', controllerHandler(airplaneController.getAirplaneById, (req, res, next) => req.params));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(airplaneController.addAirplane, (req, res, next) => req.body)
);

module.exports = router;