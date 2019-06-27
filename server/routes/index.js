const router = require('express').Router();
const passport = require('passport');

const checkAdminRights = require('../middleware/checkAdminRights');

const adminRouter = require('./admin');
const authRouter = require('./auth');
const costRouter = require('./cost');
const flightRouter = require('./flight');
const luggageOptionRouter = require('./luggageOption');
const seatRouter = require('./seat');
const ticketRouter = require('./ticket');
const userRouter = require('./user');

router.use('/admin', passport.authenticate('jwt', { session: false }), checkAdminRights, adminRouter);
router.use('/auth', authRouter);
router.use('/costs', costRouter);
router.use('/flights', flightRouter);
router.use('/luggageOptions', luggageOptionRouter);
router.use('/seats', seatRouter);
router.use('/tickets', passport.authenticate('jwt', { session: false }), ticketRouter);
router.use('/users', passport.authenticate('jwt', { session: false }), userRouter);

module.exports = router;
