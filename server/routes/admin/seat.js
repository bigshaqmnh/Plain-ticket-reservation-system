const router = require('express').Router();

const handlerWrapper = require('../../middleware/handlerWrapper');
const seatHandler = require('../../handlers/seat');

router.post('/', handlerWrapper(seatHandler.add));

router.put('/:seatId', handlerWrapper(seatHandler.update));

module.exports = router;
