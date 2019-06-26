const router = require('express').Router();

const handlerWrapper = require('../middleware/handlerWrapper');
const luggageOptionHandler = require('../handlers/luggageOption');

router.get('/', handlerWrapper(luggageOptionHandler.getAll));

router.get('/:luggageOptionId', handlerWrapper(luggageOptionHandler.getById));

module.exports = router;
