const seedCharacters = require("./character-seeds");
const seedClass = require("./class-seeds");
const seedRace = require("./race-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedCharacters();
  console.log("\n----- CHARACTERS SEEDED -----\n");

  await seedClass();
  console.log("\n----- CLASSES SEEDED -----\n");

  await seedRace();
  console.log("\n----- RACES SEEDED -----\n");

  process.exit(0);
};

seedAll();
