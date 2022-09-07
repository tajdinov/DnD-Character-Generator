// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// initialize Class model (table) by extending off Sequelize's Model class
class Class extends Model {}

// set up fields and rules for Class model
Class.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    character_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'character',
          key: 'id',
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'class',
  }
);

module.exports = Class;