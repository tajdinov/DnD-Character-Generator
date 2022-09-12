const { Race } = require("../model");

const raceData = [
  {
    race_name: "Human",
  },
  {
    race_name: "Orc",
  },
  {
    race_name: "Dwarf",
  },
  {
    race_name: "Elf",
  },
  {
    race_name: "Drow Elf",
  },
  {
    race_name: "Dragonborn",
  },
  {
    race_name: "Halfling",
  },
  {
    race_name: "Aesemar",
  },
];

const seedRace = () => Race.bulkCreate(raceData);

module.exports = seedRace;
