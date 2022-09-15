const { Character, Class } = require("../model");
const Attribute = require("../model/Attribute");
const CharacterAttribute = require("../model/CharacterAttribute");
const util = require("util");

const characterData = [
  {
    character_name: "Gandalf",
    // strength: 10,
    // dexterity: 10,
    // constitution: 10,
    // wisdom: 10,
    // intelligence: 10,
    // hit_points: 15,
    user_id: 1,
    class_id: 12,
    race_id: 8,
  },
  {
    character_name: "Frodo",
    // strength: 10,
    // dexterity: 10,
    // constitution: 10,
    // wisdom: 10,
    // intelligence: 10,
    // hit_points: 5,
    user_id: 1,
    class_id: 2,
    race_id: 7,
  },
  {
    character_name: "Samwise",
    // strength: 10,
    // dexterity: 10,
    // constitution: 10,
    // wisdom: 10,
    // intelligence: 10,
    // hit_points: 35,
    user_id: 3,
    class_id: 5,
    race_id: 7,
  },
  // {
  //   character_name: "Aragorn",
  //   strength: 10,
  //   dexterity: 10,
  //   constitution: 10,
  //   wisdom: 10,
  //   intelligence: 10,
  //   user_id: 4,
  //   hit_points: 55,
  //   class_id: 1,
  //   race_id: 1,
  // },
  // {
  //   character_name: "Legolas",
  //   strength: 10,
  //   dexterity: 10,
  //   constitution: 10,
  //   wisdom: 10,
  //   intelligence: 10,
  //   user_id: 5,
  //   hit_points: 12,
  //   class_id: 1,
  //   race_id: 1,
  // },
  // {
  //   character_name: "Gimli",
  //   strength: 10,
  //   dexterity: 10,
  //   constitution: 10,
  //   wisdom: 10,
  //   intelligence: 10,
  //   user_id: 6,
  //   hit_points: 35,
  //   class_id: 1,
  //   race_id: 1,
  // },
  // {
  //   character_name: "Boromir",
  //   strength: 10,
  //   dexterity: 10,
  //   constitution: 10,
  //   wisdom: 10,
  //   intelligence: 10,
  //   user_id: 7,
  //   hit_points: 120,
  //   class_id: 1,
  //   race_id: 1,
  //   attribute: [
  //     {
  //       attribute_id: 1,
  //       // character_attribute: {
  //       //   value: 120,
  //       // },
  //       value: 120,
  //     },
  //   ],
  // },
];

const attributes = [
  {
    character_id: 1,
    attribute_id: 1,
    value: 10,
  },
  {
    character_id: 1,
    attribute_id: 2,
    value: 8,
  },
  {
    character_id: 1,
    attribute_id: 3,
    value: 9,
  },
  {
    character_id: 1,
    attribute_id: 4,
    value: 7,
  },
  {
    character_id: 1,
    attribute_id: 5,
    value: 13,
  },
  {
    character_id: 1,
    attribute_id: 6,
    value: 12,
  },
  {
    character_id: 2,
    attribute_id: 1,
    value: 8,
  },
  {
    character_id: 2,
    attribute_id: 2,
    value: 7,
  },
  {
    character_id: 2,
    attribute_id: 3,
    value: 11,
  },
  {
    character_id: 2,
    attribute_id: 4,
    value: 9,
  },
  {
    character_id: 2,
    attribute_id: 5,
    value: 11,
  },
  {
    character_id: 2,
    attribute_id: 6,
    value: 12,
  },
  {
    character_id: 3,
    attribute_id: 1,
    value: 11,
  },
  {
    character_id: 3,
    attribute_id: 2,
    value: 10,
  },
  {
    character_id: 3,
    attribute_id: 3,
    value: 9,
  },
  {
    character_id: 3,
    attribute_id: 4,
    value: 12,
  },
  {
    character_id: 3,
    attribute_id: 5,
    value: 11,
  },
  {
    character_id: 3,
    attribute_id: 6,
    value: 8,
  },
];

const seedCharacters = async user_id => {
  const characters = characterData.map(character => ({
    ...character,
    user_id,
  }));

  await Character.bulkCreate(characters);
  await CharacterAttribute.bulkCreate(attributes);
  const character = await Character.findByPk(1, {
    include: [
      { model: Attribute, as: "attributes" },
      { model: Class, as: "class", attributes: ["class_name"] },
    ],
  });
  console.log(util.inspect(character.get({ plain: true }), undefined, 5));
};

module.exports = seedCharacters;
