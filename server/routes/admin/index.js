const router = require('express').Router();

const adminAirplaneRouter = require('./airplane');
const adminAirportRouter = require('./airport');
const adminCostRouter = require('./cost');
const adminFlightRouter = require('./flight');
const adminSeatRouter = require('./seat');

router.use('/airplanes', adminAirplaneRouter);
router.use('/airports', adminAirportRouter);
router.use('/costs', adminCostRouter);
router.use('/flights', adminFlightRouter);
router.use('/seats', adminSeatRouter);

module.exports = router;
