const router = require('express').Router();

const airplaneHandler = require('../../handlers/airplane');
const handlerWrapper = require('../../middleware/handlerWrapper');

router.get('/', handlerWrapper(airplaneHandler.getAll));

router.post('/', handlerWrapper(airplaneHandler.add));

module.exports = router;
