require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const statusCode = require('http-status-codes');
const passport = require('passport');
require('./passportSetup')(passport);
require('./sequelizeSetup');

const authRouter = require('./routes/auth');
const adminAirplaneRouter = require('./routes/admin/airplane');
const adminAirportRouter = require('./routes/admin/airport');
const adminCostRouter = require('./routes/admin/cost');
const costRouter = require('./routes/cost');
const adminFlightRouter = require('./routes/admin/flight');
const flightRouter = require('./routes/flight');
const luggageOptionRouter = require('./routes/luggageOption');
const adminSeatRouter = require('./routes/admin/seat');
const seatRouter = require('./routes/seat');
const ticketRouter = require('./routes/ticket');
const userRouter = require('./routes/user');

const checkAdminRights = require('./middleware/checkAdminRights');

const app = express();

app.use(logger(process.env.LOGGER_CONFIG));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('../public/index.html'));

app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: process.env.ORIGIN_URL
  })
);

app.use('/auth', authRouter);
app.use('/admin/airplanes', passport.authenticate('jwt', { session: false }), checkAdminRights, adminAirplaneRouter);
app.use('/admin/airports', passport.authenticate('jwt', { session: false }), checkAdminRights, adminAirportRouter);
app.use('/admin/costs', passport.authenticate('jwt', { session: false }), checkAdminRights, adminCostRouter);
app.use('/costs', costRouter);
app.use('/admin/flights', passport.authenticate('jwt', { session: false }), checkAdminRights, adminFlightRouter);
app.use('/flights', flightRouter);
app.use('/luggageOptions', luggageOptionRouter);
app.use('/admin/seats', passport.authenticate('jwt', { session: false }), checkAdminRights, adminSeatRouter);
app.use('/seats', seatRouter);
app.use('/tickets', passport.authenticate('jwt', { session: false }), ticketRouter);
app.use('/users', passport.authenticate('jwt', { session: false }), userRouter);

app.use((req, res, next) => res.sendStatus(statusCode.NOT_FOUND));

app.use((err, req, res, next) => res.sendStatus(statusCode.INTERNAL_SERVER_ERROR));

const port = process.env.SERVER_PORT || '3000';

app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
