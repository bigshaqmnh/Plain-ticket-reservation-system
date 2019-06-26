const router = require('express').Router();

const handlerWrapper = require('../middleware/handlerWrapper');
const seatHandler = require('../handlers/seat');

router.get('/:airplaneId', handlerWrapper(seatHandler.getByAirplaneId));

module.exports = router;
