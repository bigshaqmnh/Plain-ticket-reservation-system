var express = require('express');
var router = express.Router();

const controllerHandler = require('./controllerHandler');
const authController = require('../controllers/auth');

router.post('/login', controllerHandler(authController.logIn, (req, res, next) => req.body));

router.post('/signUp', controllerHandler(authController.signUp, (req, res, next) => req.body));

module.exports = router;
