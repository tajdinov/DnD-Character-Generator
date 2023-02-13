const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, CLEARDB_DATABASE_URL } =
  process.env;

if (CLEARDB_DATABASE_URL) {
  console.log("Attempting to connect with connection url");
  sequelize = new Sequelize(CLEARDB_DATABASE_URL);
} else {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    dialectOptions: {
      socketPath: "your socket path",
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
    port: 3306,
  });
}

module.exports = sequelize;
