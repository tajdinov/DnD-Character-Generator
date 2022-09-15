// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");
class CharacterAttribute extends Model {}

CharacterAttribute.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    character_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "character",
        key: "id",
      },
    },
    attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "attribute",
        key: "id",
      },
    },
    value: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "character_attribute",
  }
);

module.exports = CharacterAttribute;
