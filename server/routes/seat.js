var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const seatController = require('../controllers/seat');

router.get('/:airplaneId', controllerHandler(seatController.getByAirplaneId, (req, res, next) => req.params));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(seatController.add, (req, res, next) => req.body)
);

router.post(
  '/:seatId',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(seatController.update, (req, res, next) => ({ id: req.params.seatId, seat: req.body }))
);

module.exports = router;
