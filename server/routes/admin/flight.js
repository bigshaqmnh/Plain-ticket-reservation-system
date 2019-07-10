const router = require('express').Router();

const wrapHandlerToCatchError = require('../../middleware/handlerWrapper');
const flightHandler = require('../../handlers/flight');

router.get('/', wrapHandlerToCatchError(flightHandler.getAll));

router.get('/:flightId', wrapHandlerToCatchError(flightHandler.getById));

router.post('/', wrapHandlerToCatchError(flightHandler.add));

router.put('/:flightId', wrapHandlerToCatchError(flightHandler.update));

module.exports = router;
