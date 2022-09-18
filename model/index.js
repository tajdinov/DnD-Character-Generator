const User = require("./User");
const Character = require("./Character");
const Class = require("./Class");
const Race = require("./Race");
const Attribute = require("./Attribute");
const CharacterAttribute = require("./CharacterAttribute");

// A user can have many characters
User.hasMany(Character, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A character belongs to a single user
Character.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// A character belongs to one race and one class
Character.belongsTo(Class, {
  foreignKey: "class_id",
  onDelete: "SET NULL",
});

Character.belongsTo(Race, {
  foreignKey: "race_id",
  onDelete: "SET NULL",
});

Class.hasMany(Character, {
  foreignKey: "class_id",
});

Race.hasMany(Character, {
  foreignKey: "race_id",
});

Character.belongsToMany(Attribute, {
  through: { model: CharacterAttribute, unique: true },
  foreignKey: "character_id",
  as: "attributes",
});
Attribute.belongsToMany(Character, {
  through: { model: CharacterAttribute, unique: true },
  foreignKey: "attribute_id",
  as: "character",
});

User.hasMany(Character, {
  foreignKey: "user_id",
});

CharacterAttribute.belongsTo(Character, {
  foreignKey: "character_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

CharacterAttribute.belongsTo(Attribute, {
  foreignKey: "attribute_id",
  as: "attribute",
});

module.exports = {
  User,
  Character,
  Attribute,
  CharacterAttribute,
  Class,
  Race,
};
