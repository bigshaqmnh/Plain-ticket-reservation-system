var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const seatController = require('../controllers/seat');
const hasRights = require('../middleware/checkRights');

router.get('/:airplaneId', controllerHandler(seatController.getByAirplaneId, (req, res, next) => req.params));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => hasRights(req, res, next),
  controllerHandler(seatController.add, (req, res, next) => req.body)
);

router.put(
  '/:seatId',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => hasRights(req, res, next),
  controllerHandler(seatController.update, (req, res, next) => ({ id: req.params.seatId, seat: req.body }))
);

module.exports = router;
