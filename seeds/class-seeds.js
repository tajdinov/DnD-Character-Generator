const { Class } = require("../model");

const classData = [
  {
    class_name: "Barbarian",
    character_id: 1,
  },
  {
    class_name: "Bard",
    character_id: 2,
  },
  {
    class_name: "Cleric",
    character_id: 3,
  },
  {
    class_name: "Druid",
    character_id: 4,
  },
  {
    class_name: "Fighter",
    character_id: 5,
  },
  {
    class_name: "Monk",
    character_id: 6,
  },
  {
    class_name: "Paladin",
    character_id: 7,
  },
  {
    class_name: "Ranger",
    character_id: 8,
  },
  {
    class_name: "Rogue",
    character_id: 9,
  },
  {
    class_name: "Sorcerer",
    character_id: 10,
  },
  {
    class_name: "Warlock",
    character_id: 11,
  },
  {
    class_name: "Wizard",
    character_id: 12,
  },
];

const seedClass = () => Class.bulkCreate(classData);

module.exports = seedClass;
