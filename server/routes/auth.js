const router = require('express').Router();

const authHandler = require('../handlers/auth');
const wrapHandlerToCatchError = require('../middleware/handlerWrapper');

router.post('/logIn', wrapHandlerToCatchError(authHandler.logIn));

router.post('/signUp', wrapHandlerToCatchError(authHandler.signUp));

module.exports = router;
