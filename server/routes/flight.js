const router = require('express').Router();

const wrapHandlerToCatchError = require('../middleware/handlerWrapper');
const flightHandler = require('../handlers/flight');

router.get('/', wrapHandlerToCatchError(flightHandler.getByParams));

module.exports = router;
