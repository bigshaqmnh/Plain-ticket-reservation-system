const router = require('express').Router();

const wrapHandlerToCatchError = require('../middleware/handlerWrapper');
const userHandler = require('../handlers/user');

router.put('/', wrapHandlerToCatchError(userHandler.update));

module.exports = router;
