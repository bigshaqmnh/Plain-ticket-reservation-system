const router = require('express').Router();

const controllerHandler = require('./controllerHandler');
const luggageOptionController = require('../controllers/luggageOption');

router.get('/', controllerHandler(luggageOptionController.getAll));

router.get('/:luggageOptionId', controllerHandler(luggageOptionController.getById, (req, res, next) => req.params));

module.exports = router;
