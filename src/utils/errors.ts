export class CustomError extends Error {
  /**
   *
   * @param {number} statusCode
   * @param {string} message
   * @param {any[]} errors
   * @param {string} stack
   */
  public success: boolean;
  public data: null;

  constructor(
    public message: string = "Something went wrong",
    public statusCode: number,
    public errors: string[] | null = [],
    public stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); // Error.captureStackTrace(this, this.constructor) is called to generate a stack trace automatically.
    }
  }
}
