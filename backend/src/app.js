const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const helmet = require('helmet');

const app = express();

const graphqlHttp = require('./graphql');
const searchRouter = require('./routes/SearchRoute');
const commonMiddleware = require('./middlewares/common.middleware');

app.use(helmet());
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: false,
    msg: 'HTTP  ',
    expressFormat: true,
    colorize: true,
    ignoreRoute: () => false,
  }),
);
app.use(commonMiddleware.logErrors);
app.use(commonMiddleware.errorHandler);
app.use(require('cors')());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/graphql', graphqlHttp);
app.use('/search', searchRouter);

module.exports = app;
