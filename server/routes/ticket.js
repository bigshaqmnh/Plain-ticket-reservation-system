const router = require('express').Router();

const handlerWrapper = require('../middleware/handlerWrapper');
const ticketHandler = require('../handlers/ticket');

router.get('/', handlerWrapper(ticketHandler.getByUserId));

router.post('/', handlerWrapper(ticketHandler.add));

module.exports = router;
