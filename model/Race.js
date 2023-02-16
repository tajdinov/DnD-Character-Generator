// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// initialize Race model (table) by extending off Sequelize's Model class
class Race extends Model {}

// set up fields and rules for Race model
Race.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    race_name: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1234),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "race",
  }
);

module.exports = Race;
