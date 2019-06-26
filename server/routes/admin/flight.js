const router = require('express').Router();

const handlerWrapper = require('../../middleware/handlerWrapper');
const flightHandler = require('../../handlers/flight');

router.get('/', handlerWrapper(flightHandler.getAll));

router.post('/', handlerWrapper(flightHandler.add));

router.put('/:flightId', handlerWrapper(flightHandler.update));

module.exports = router;
