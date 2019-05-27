var express = require('express');
var router = express.Router();

const c = require('../controllerHandler');
const controller = require('../../controllers/auth');

router.post('/login', c(controller.logIn, (req, res, next) => [req.body.email, req.body.password]));

module.exports = router;
