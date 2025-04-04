class appErrors extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.isOperationError = true;
  }
}

export default appErrors;
