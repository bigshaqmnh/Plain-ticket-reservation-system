const router = require('express').Router();

const wrapHandlerToCatchError = require('../middleware/handlerWrapper');
const luggageOptionHandler = require('../handlers/luggageOption');

router.get('/', wrapHandlerToCatchError(luggageOptionHandler.getAll));

router.get('/:luggageOptionId', wrapHandlerToCatchError(luggageOptionHandler.getById));

module.exports = router;
