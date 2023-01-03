function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).json('error', { error: err });
}

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

module.exports = {
  logErrors,
  errorHandler,
};
