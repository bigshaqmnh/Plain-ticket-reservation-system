var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const airportController = require('../controllers/airport');
const hasRights = require('../middleware/checkRights');

router.get('/', controllerHandler(airportController.getAll, (req, res, next) => req.query));

router.get('/:airportId', controllerHandler(airportController.getById, (req, res, next) => req.params));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => hasRights(req, res, next),
  controllerHandler(airportController.add, (req, res, next) => req.body)
);

module.exports = router;
