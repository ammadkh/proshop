export const notFound = (req, res, next) => {
  const error = new Error(`Not Found-${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  let statusCode = res.status === 200 ? 500 : res.status;
  let message = error.message;
  if (error.name === "CastError" && error.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }
  res.status(statusCode).json({
    message,
    stack:
      process.env.NODE_ENV === "production" ? "production error" : error.stack,
  });
};
