// B6: Catch-all handler for undefined routes.
function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
}

// B6: Global error-handling middleware. Must have 4 args for Express
// to recognize it as an error handler.
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(err.stack || err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
}

module.exports = { notFoundHandler, errorHandler };
