const { User } = require("../model");

const users = {
  first_name: "Guest",
  last_name: "Account",
  email: "guest@email.com",
  password: "pass1234",
};

const seedData = async () => {
  const user = await User.create(users);
  return user.id;
};

module.exports = seedData;
