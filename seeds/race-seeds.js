const { Race } = require("../model");

const raceData = [
  {
    race_name: "Human",
    character_id: 1,
  },
  {
    race_name: "Orc",
    character_id: 2,
  },
  {
    race_name: "Dwarf",
    character_id: 3,
  },
  {
    race_name: "Elf",
    character_id: 4,
  },
  {
    race_name: "Drow Elf",
    character_id: 5,
  },
  {
    race_name: "Dragonborn",
    character_id: 6,
  },
  {
    race_name: "Halfling",
    character_id: 7,
  },
  {
    race_name: "Aesemar",
    character_id: 8,
  },
];

const seedRace = () => Race.bulkCreate(raceData);

module.exports = seedRace;
