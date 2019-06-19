var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const airportController = require('../controllers/airport');

router.get('/', controllerHandler(airportController.getAll, (req, res, next) => req.query));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(airportController.add, (req, res, next) => req.body)
);

module.exports = router;
