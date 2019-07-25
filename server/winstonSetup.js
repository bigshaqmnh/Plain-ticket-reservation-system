const { createLogger, transports } = require('winston');
const { combine, colorize, simple, timestamp, prettyPrint } = require('winston').format;
const { NODE_ENV, LOGFILE } = process.env;

const logger = createLogger({
  level: 'error',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    prettyPrint()
  ),
  transports: [new transports.File({ filename: LOGFILE, level: 'error' })]
});

if (NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(colorize(), simple(), prettyPrint())
    })
  );
}

module.exports = logger;
