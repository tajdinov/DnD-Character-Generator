const { Character } = require("../model");

const characterData = [
  {
    character_name: "Gandalf",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 1,
  },
  {
    character_name: "Frodo",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 2,
  },
  {
    character_name: "Samwise",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 3,
  },
  {
    character_name: "Aragorn",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 4,
  },
  {
    character_name: "Legolas",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 5,
  },
  {
    character_name: "Gimli",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 6,
  },
  {
    character_name: "Boromir",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 7,
  },
];

const seedCharacters = () => Character.bulkCreate(characterData);

module.exports = seedCharacters;
