const router = require('express').Router();

const costHandler = require('../../handlers/cost');
const handlerWrapper = require('../../middleware/handlerWrapper');

router.post('/', handlerWrapper(costHandler.add));

router.put('/:costId', handlerWrapper(costHandler.update));

module.exports = router;
