const router = require('express').Router();

const costHandler = require('../../handlers/cost');
const wrapHandlerToCatchError = require('../../middleware/handlerWrapper');

router.post('/', wrapHandlerToCatchError(costHandler.add));

router.put('/:costId', wrapHandlerToCatchError(costHandler.update));

module.exports = router;
