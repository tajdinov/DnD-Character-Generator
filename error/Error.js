class HandledError extends Error {
  constructor(msg, status) {
    super(msg);
    this.message = msg;
    this.status = status;
    this.name = "Operational Error";
  }
  static unknownError() {
    return new HandledError(1);
  }
  static badRequest(msg) {
    const err = new HandledError();
    if (msg) {
      err.message += ": " + msg;
    }
    return err;
  }
  static unauthorised() {
    return new HandledError("Unauthorised");
  }
  static notFound() {
    return new HandledError("Not found");
  }
  static knownErr(msg) {
    return new HandledError("");
  }
}

module.exports = HandledError;
