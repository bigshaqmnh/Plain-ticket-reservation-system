var express = require('express');
var router = express.Router();
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const airplaneController = require('../controllers/airplane');

router.get('/', controllerHandler(airplaneController.getAll, (req, res, next) => req.query));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(airplaneController.add, (req, res, next) => req.body)
);

module.exports = router;
