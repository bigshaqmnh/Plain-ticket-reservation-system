const router = require('express').Router();

const authHandler = require('../handlers/auth');
const handlerWrapper = require('../middleware/handlerWrapper');

router.post('/logIn', handlerWrapper(authHandler.logIn));

router.post('/signUp', handlerWrapper(authHandler.signUp));

module.exports = router;
