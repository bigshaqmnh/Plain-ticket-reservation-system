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
const airplaneRouter = require('./routes/airplane');
const airportRouter = require('./routes/airport');
const flightRouter = require('./routes/flight');
const costRouter = require('./routes/cost');
const luggageOptionRouter = require('./routes/luggageOption');
const seatRouter = require('./routes/seat');
const ticketRouter = require('./routes/ticket');
const userRouter = require('./routes/user');

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
app.use('/airplanes', airplaneRouter);
app.use('/airports', airportRouter);
app.use('/flights', flightRouter);
app.use('/costs', costRouter);
app.use('/luggageOptions', luggageOptionRouter);
app.use('/seats', seatRouter);
app.use('/tickets', ticketRouter);
app.use('/users', userRouter);

app.use((req, res) => {
  res.sendStatus(statusCode.NOT_FOUND);
});

const port = process.env.SERVER_PORT || '3000';

app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
