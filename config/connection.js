const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

const {
  MYSQLDATABASE,
  MYSQLUSER,
  MYSQLPASSWORD,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  MYSQLHOST,
  CLEARDB_DATABASE_URL,
  MYSQLPORT,
  MYSQL_URL,
} = process.env;

if (MYSQL_URL) {
  console.log("Attempting to connect with connection url");
  sequelize = new Sequelize(MYSQL_URL);
} else {
  sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
    host: MYSQLHOST || "localhost",
    dialect: "mysql",
    port: MYSQLPORT || 3306,
  });
}

module.exports = sequelize;
