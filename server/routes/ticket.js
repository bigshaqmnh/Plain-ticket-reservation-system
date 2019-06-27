const router = require('express').Router();

const wrapHandlerToCatchError = require('../middleware/handlerWrapper');
const ticketHandler = require('../handlers/ticket');

router.get('/', wrapHandlerToCatchError(ticketHandler.getByUserId));

router.post('/', wrapHandlerToCatchError(ticketHandler.add));

module.exports = router;
