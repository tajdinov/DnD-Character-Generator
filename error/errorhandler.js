const HandledError = require("./Error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof HandledError) {
    if (err.render) {
      return res.render("error", { error: err.message });
    }
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).json({ error: "Unknown" });
};

module.exports = errorHandler;
