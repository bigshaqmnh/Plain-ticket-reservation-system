require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const statusCode = require('http-status-codes');
const passport = require('passport');
const logger = require('./winstonSetup');
require('./passportSetup')(passport);
require('./sequelizeSetup');

const app = express();
const routes = require('./routes');

app.use(morgan(process.env.MORGAN_CONFIG));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('../public/index.html'));

app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: [process.env.ADMIN_URL, process.env.CLIENT_URL]
  })
);

app.use(routes);

app.use((req, res, next) => res.sendStatus(statusCode.NOT_FOUND));

app.use((err, req, res, next) => {
  logger.error(err);
  res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
});

const port = process.env.SERVER_PORT || '3000';

app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
