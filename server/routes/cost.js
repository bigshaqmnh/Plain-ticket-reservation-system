const router = require('express').Router();

const costHandler = require('../handlers/cost');
const handlerWrapper = require('../middleware/handlerWrapper');

router.get('/:flightId', handlerWrapper(costHandler.getByFlightId));

module.exports = router;
