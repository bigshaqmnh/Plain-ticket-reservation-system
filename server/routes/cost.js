var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const costController = require('../controllers/cost');

router.get('/:flightId', controllerHandler(costController.getByFlightId, (req, res, next) => req.params));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(costController.add, (req, res, next) => req.body)
);

router.put(
  '/:costId',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(costController.update, (req, res, next) => ({ id: req.params.costId, cost: req.body }))
);

module.exports = router;
