const router = require('express').Router();

const airportHandler = require('../../handlers/airport');
const wrapHandlerToCatchError = require('../../middleware/handlerWrapper');

router.get('/', wrapHandlerToCatchError(airportHandler.getAll));

router.post('/', wrapHandlerToCatchError(airportHandler.add));

module.exports = router;
