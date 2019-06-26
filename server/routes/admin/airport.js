const router = require('express').Router();

const airportHandler = require('../../handlers/airport');
const handlerWrapper = require('../../middleware/handlerWrapper');

router.get('/', handlerWrapper(airportHandler.getAll));

router.post('/', handlerWrapper(airportHandler.add));

module.exports = router;
