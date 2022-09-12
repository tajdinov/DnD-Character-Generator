const { Class } = require("../model");

const classData = [
  {
    class_name: "Barbarian",
  },
  {
    class_name: "Bard",
  },
  {
    class_name: "Cleric",
  },
  {
    class_name: "Druid",
  },
  {
    class_name: "Fighter",
  },
  {
    class_name: "Monk",
  },
  {
    class_name: "Paladin",
  },
  {
    class_name: "Ranger",
  },
  {
    class_name: "Rogue",
  },
  {
    class_name: "Sorcerer",
  },
  {
    class_name: "Warlock",
  },
  {
    class_name: "Wizard",
  },
];

const seedClass = () => Class.bulkCreate(classData);

module.exports = seedClass;
