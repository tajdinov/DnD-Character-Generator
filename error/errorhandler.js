const HandledError = require("./Error");
const { ValidationError } = require("sequelize");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError && Array.isArray(err.errors)) {
    const errors = err.errors.map(error => {
      switch (error.validatorKey) {
        case "isEmail":
          return "Email provided is not a valid format";
        case "len":
          return `Password must be at least ${error.validatorArgs[0]} characters`;
        default:
          return "";
      }
    });
    return res.status(400).json({ error: errors.join(", ") });
  }
  if (err instanceof HandledError) {
    if (err.render) {
      return res.render("error", { error: err.message });
    }
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).json({ error: "Unknown" });
};

module.exports = errorHandler;
