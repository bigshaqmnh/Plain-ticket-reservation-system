var express = require('express');
var router = express.Router();

const controllerHandler = require('./controllerHandler');
const authController = require('../controllers/auth');

router.post('/login', controllerHandler(authController.logIn, (req, res, next) => [req.body.email, req.body.password]));

module.exports = router;
