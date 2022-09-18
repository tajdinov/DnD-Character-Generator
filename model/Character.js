// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// initialize Character model (table) by extending off Sequelize's Model class
class Character extends Model {}

// set up fields and rules for Character model
Character.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    character_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    character_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    class_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "class",
        key: "id",
      },
    },
    race_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "race",
        key: "id",
      },
    },
    // Store a reference of the `id` of the `User` that owns this Character
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "character",
  }
);

module.exports = Character;
