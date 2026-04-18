class ApiError extends Error {
  constructor(
    statusCode,
    message = "An error occurred",
    errors = [],
    stack = "",
  ) {
    super(message); // Call the parent constructor with the message
    this.statusCode = statusCode;
    this.errors = errors; // You can add an errors property to hold any additional error details, such as validation errors, etc.
    this.data = null; // You can add a data property if you want to include additional information about the error. e.g., validation errors, etc.

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
