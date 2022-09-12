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
    hit_points: 15,
    class_id: 1,
    race_id: 1,
  },
  {
    character_name: "Frodo",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 2,
    hit_points: 5,
    class_id: 1,
    race_id: 1,
  },
  {
    character_name: "Samwise",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 3,
    hit_points: 35,
    class_id: 1,
    race_id: 1,
  },
  {
    character_name: "Aragorn",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 4,
    hit_points: 55,
    class_id: 1,
    race_id: 1,
  },
  {
    character_name: "Legolas",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 5,
    hit_points: 12,
    class_id: 1,
    race_id: 1,
  },
  {
    character_name: "Gimli",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 6,
    hit_points: 35,
    class_id: 1,
    race_id: 1,
  },
  {
    character_name: "Boromir",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    wisdom: 10,
    intelligence: 10,
    user_id: 7,
    hit_points: 120,
    class_id: 1,
    race_id: 1,
  },
];

const seedCharacters = async user_id => {
  const characters = characterData.map(character => ({
    ...character,
    user_id,
  }));

  await Character.bulkCreate(characters);
};

module.exports = seedCharacters;
