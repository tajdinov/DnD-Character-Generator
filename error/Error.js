class HandledError extends Error {
  constructor(msg, render = false, status = 500) {
    super(msg);
    this.message = msg;
    this.status = status;
    this.render = render;
    this.name = "Operational Error";
  }
  static unknownError() {
    return new HandledError(1);
  }
  static badRequest(msg) {
    const err = new HandledError("Bad request", false, 400);
    if (msg) {
      err.message += ": " + msg;
    }
    return err;
  }
  static invalidCredentials() {
    const err = new HandledError(
      "User name or password is incorrect",
      false,
      400
    );
    return err;
  }
  static unauthorised() {
    return new HandledError("Unauthorised");
  }
  static notFound() {
    return new HandledError("Not found");
  }
  static knownErr(msg = "An error occurred") {
    return new HandledError(msg);
  }
  static databaseError() {
    return new HandledError(
      "Our database is down, please try again soon!",
      true
    );
  }
}

module.exports = HandledError;
