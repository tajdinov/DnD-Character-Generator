const User = require("./User");
const Character = require("./Character");
const Class = require("./Class");
const Race = require("./Race");

// A user can have many characters
User.hasMany(Character, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// A character belongs to a single user
Character.belongsTo(User, {
  foreignKey: "user_id",
});

// A character has one race and one class
Character.hasOne(Class, {
  foreignKey: "character_id",
  onDelete: "CASCADE",
});

Character.hasOne(Race, {
  foreignKey: "character_id",
  onDelete: "CASCADE",
});

Class.belongsTo(Character, {
  foreignKey: "character_id",
});

Race.belongsTo(Character, {
  foreignKey: "character_id",
});

module.exports = {
  User,
  Character,
  Class,
  Race,
};
