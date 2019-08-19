const router = require('express').Router();

const airportHandler = require('../handlers/airport');
const wrapHandlerToCatchError = require('../middleware/handlerWrapper');

router.get('/', wrapHandlerToCatchError(airportHandler.getAll));

module.exports = router;
