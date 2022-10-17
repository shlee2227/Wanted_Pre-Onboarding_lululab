class BaseError extends Error {
  constructor(message, httpStatusCode) {
    super(message);

    this.message = message;
    this.statusCode = httpStatusCode;

    this.date = new Date();

    Error.captureStackTrace(this);
  }
}

module.exports = { BaseError };
