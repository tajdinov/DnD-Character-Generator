const Attribute = require("../model/Attribute");

const attributes = [
  {
    name: "Hit Points",
  },
  {
    name: "Strength",
  },
  {
    name: "Dexterity",
  },
  {
    name: "Constitution",
  },
  {
    name: "Wisdom",
  },
  {
    name: "Intelligence",
  },
];

const seedAttributes = async () => {
  await Attribute.bulkCreate(attributes);
};

module.exports = seedAttributes;
