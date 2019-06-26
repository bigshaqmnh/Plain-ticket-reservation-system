const handlerWrapper = handler => (req, res, next) => handler(req, res, next).catch(next);

module.exports = handlerWrapper;
