// import important parts of sequelize library
const { Model, DataTypes, UUIDV4 } = require("sequelize");

const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// initialize User model (table) by extending off Sequelize's Model class
class User extends Model {
  async checkPassword(loginPw) {
    return await bcrypt.compare(loginPw, this.password);
  }
}

// set up fields and rules for User model
User.init(
  {
    // define columns
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4(),
    },
    first_name: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(1234),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(1234),
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async newUserData => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async updatedUserData => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
