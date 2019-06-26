const router = require('express').Router();

const handlerWrapper = require('../middleware/handlerWrapper');
const userHandler = require('../handlers/user');

router.put('/', handlerWrapper(userHandler.update));

module.exports = router;
