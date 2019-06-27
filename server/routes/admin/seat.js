const router = require('express').Router();

const wrapHandlerToCatchError = require('../../middleware/handlerWrapper');
const seatHandler = require('../../handlers/seat');

router.post('/', wrapHandlerToCatchError(seatHandler.add));

router.put('/:seatId', wrapHandlerToCatchError(seatHandler.update));

module.exports = router;
