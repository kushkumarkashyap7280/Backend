class apiError extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.success = false; // Default to false
    this.statusCode = statusCode;
    this.message = message;
    this.data = null; // Initialize data to null
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    };
  }
}

export default apiError;