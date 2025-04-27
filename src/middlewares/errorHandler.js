module.exports = (err, req, res, next) => {
  var statusCode = err.status || 500;

  const response = {
    error: {
      message: err.message || "Internal Server Error",
    },
  };

  res.status(statusCode).json(response);
};
