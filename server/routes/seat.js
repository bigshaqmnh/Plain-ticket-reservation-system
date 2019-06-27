const router = require('express').Router();

const wrapHandlerToCatchError = require('../middleware/handlerWrapper');
const seatHandler = require('../handlers/seat');

router.get('/:airplaneId', wrapHandlerToCatchError(seatHandler.getByAirplaneId));

module.exports = router;
