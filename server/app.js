require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('./passportSetup')(passport);
require('./sequelizeSetup');

const authRouter = require('./routes/auth');
const airplaneRouter = require('./routes/airplane');

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

app.use(function(req, res, next) {
  next(createError(404, 'The page you are looking for does not exist.'));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

const port = process.env.SERVER_PORT || '3000';

app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
