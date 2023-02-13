const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  MYSQLHOST,
  CLEARDB_DATABASE_URL,
  MYSQLPORT,
} = process.env;

if (CLEARDB_DATABASE_URL) {
  console.log("Attempting to connect with connection url");
  sequelize = new Sequelize(CLEARDB_DATABASE_URL);
} else {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: MYSQLHOST || "localhost",
    dialect: "mysql",
    port: 3306 || MYSQLPORT,
  });
}

module.exports = sequelize;
