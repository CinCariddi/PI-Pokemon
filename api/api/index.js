// Entry point used by Vercel. It exports the Express app instead of listening on a port:
// Vercel invokes it once per request as a serverless function.
// The local server still starts from ../index.js.
const app = require('../src/app');

module.exports = app;
