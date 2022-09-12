const User = require("./User");
const Character = require("./Character");
const Class = require("./Class");
const Race = require("./Race");

// A user can have many characters
User.hasMany(Character, {
  onDelete: "CASCADE",
});

// A character belongs to a single user
Character.belongsTo(User, {
  foreignKey: "user_id",
});

// A character has one race and one class
Character.hasOne(Class, {
  foreignKey: "class_id",
  onDelete: "CASCADE",
});

Character.hasOne(Race, {
  foreignKey: "race_id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Character,
  Class,
  Race,
};
