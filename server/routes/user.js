const router = require('express').Router;
const passport = require('passport');

const controllerHandler = require('./controllerHandler');
const userController = require('../controllers/user');

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(userController.update, (req, res, next) => ({ id: req.user.id, user: req.body }))
);

module.exports = router;
