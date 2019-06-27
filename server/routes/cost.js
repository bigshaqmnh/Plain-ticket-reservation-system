const router = require('express').Router();

const costHandler = require('../handlers/cost');
const wrapHandlerToCatchError = require('../middleware/handlerWrapper');

router.get('/:flightId', wrapHandlerToCatchError(costHandler.getByFlightId));

module.exports = router;
