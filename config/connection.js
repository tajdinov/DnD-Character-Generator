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
    host: "mysql://root:SvKWio1PvDNPaTQvSEqz@containers-us-west-185.railway.app:6200/railway",
    dialect: "mysql",
    port: 3306,
  });
}

module.exports = sequelize;
