var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const airplaneController = require('../controllers/airplane');
const hasRights = require('../middleware/checkRights');

router.get('/', controllerHandler(airplaneController.getAll, (req, res, next) => req.query));

router.get('/:airplaneId', controllerHandler(airplaneController.getById, (req, res, next) => req.params));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => hasRights(req, res, next),
  controllerHandler(airplaneController.add, (req, res, next) => req.body)
);

module.exports = router;
