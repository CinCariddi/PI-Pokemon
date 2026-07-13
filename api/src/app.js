require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

require('./db');

const { CORS_ORIGIN = 'http://localhost:3000' } = process.env;

// CORS_ORIGIN holds a comma-separated list, so the deployed client and localhost can be
// allowed at the same time.
const allowedOrigins = CORS_ORIGIN.split(',').map((origin) => origin.trim());

const server = express();

server.use(cors({
  origin(origin, callback) {
    // Requests with no Origin header (curl, health checks) are not browser calls.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Origin ${origin} is not allowed by CORS.`));
  },
  credentials: true,
}));
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(morgan('dev'));

server.use('/', routes);

server.use((req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const isValidationError = err.name === 'SequelizeValidationError';
  const status = err.status || (isValidationError ? 400 : 500);

  if (!isValidationError) console.error(err);

  res.status(status).json({ error: err.message || 'Internal server error.' });
});

module.exports = server;
