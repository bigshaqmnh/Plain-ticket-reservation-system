const router = require('express').Router();

const airplaneHandler = require('../../handlers/airplane');
const wrapHandlerToCatchError = require('../../middleware/handlerWrapper');

router.get('/', wrapHandlerToCatchError(airplaneHandler.getAll));

router.post('/', wrapHandlerToCatchError(airplaneHandler.add));

module.exports = router;
