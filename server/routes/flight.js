const router = require('express').Router();

const handlerWrapper = require('../middleware/handlerWrapper');
const flightHandler = require('../handlers/flight');

router.get('/', handlerWrapper(flightHandler.getByParams));

module.exports = router;
