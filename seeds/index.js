const seedCharacters = require("./character-seeds");
const seedClass = require("./class-seeds");
const seedRace = require("./race-seeds");
const seedUsers = require("./user-seed");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  console.log("\n----- DATABASE SYNCED -----\n");

  const user_id = await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedClass();
  console.log("\n----- CLASSES SEEDED -----\n");

  await seedRace();
  console.log("\n----- RACES SEEDED -----\n");

  await seedCharacters(user_id);
  console.log("\n----- CHARACTERS SEEDED -----\n");

  process.exit(0);
};

seedAll();
