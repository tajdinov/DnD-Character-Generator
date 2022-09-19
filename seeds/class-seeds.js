const { Class } = require("../model");

const classData = [
  {
    class_name: "Barbarian",
    description:
      "A tall human tribesman strides through a blizzard, draped in fur and hefting his axe. He laughs as he charges toward the frost giant who dared poach his people’s elk herd.",
  },
  {
    class_name: "Bard",
    description:
      "Humming as she traces her fingers over an ancient monument in a long-forgotten ruin, a half-elf in rugged leathers finds knowledge springing into her mind, conjured forth by the magic of her song—knowledge of the people who constructed the monument and the mythic saga it depicts.",
  },
  {
    class_name: "Cleric",
    description:
      "Arms and eyes upraised toward the sun and a prayer on his lips, an elf begins to glow with an inner light that spills out to heal his battle-worn companions.",
  },
  {
    class_name: "Druid",
    description:
      "Holding high a gnarled staff wreathed with holly, an elf summons the fury of the storm and calls down explosive bolts of lightning to smite the torch-carrying orcs who threaten her forest.",
  },
  {
    class_name: "Fighter",
    description:
      "A human in clanging plate armor holds her shield before her as she runs toward the massed goblins. An elf behind her, clad in studded leather armor, peppers the goblins with arrows loosed from his exquisite bow. The half-orc nearby shouts orders, helping the two combatants coordinate their assault to the best advantage.",
  },
  {
    class_name: "Monk",
    description:
      "Her fists a blur as they deflect an incoming hail of arrows, a half-elf springs over a barricade and throws herself into the massed ranks of hobgoblins on the other side. She whirls among them, knocking their blows aside and sending them reeling, until at last she stands alone.",
  },
  {
    class_name: "Paladin",
    description:
      "Clad in plate armor that gleams in the sunlight despite the dust and grime of long travel, a human lays down her sword and shield and places her hands on a mortally wounded man. Divine radiance shines from her hands, the mans wounds knit closed, and his eyes open wide with amazement.",
  },
  {
    class_name: "Ranger",
    description:
      "Rough and wild looking, a human stalks alone through the shadows of trees, hunting the orcs he knows are planning a raid on a nearby farm. Clutching a shortsword in each hand, he becomes a whirlwind of steel, cutting down one enemy after another.",
  },
  {
    class_name: "Rogue",
    description:
      "Signaling for her companions to wait, a halfling creeps forward through the dungeon hall. She presses an ear to the door, then pulls out a set of tools and picks the lock in the blink of an eye. Then she disappears into the shadows as her fighter friend moves forward to kick the door open.",
  },
  {
    class_name: "Sorcerer",
    description:
      "Golden eyes flashing, a human stretches out her hand and unleashes the dragonfire that burns in her veins. As an inferno rages around her foes, leathery wings spread from her back and she takes to the air.",
  },
  {
    class_name: "Warlock",
    description:
      "With a pseudodragon curled on his shoulder, a young elf in golden robes smiles warmly, weaving a magical charm into his honeyed words and bending the palace sentinel to his will.",
  },
  {
    class_name: "Wizard",
    description:
      "Clad in the silver robes that denote her station, an elf closes her eyes to shut out the distractions of the battlefield and begins her quiet chant. Fingers weaving in front of her, she completes her spell and launches a tiny bead of fire toward the enemy ranks, where it erupts into a conflagration that engulfs the soldiers.",
  },
];

const seedClass = async () => {
  const classes = await Class.bulkCreate(classData);
  const ids = classes.map(cls => cls.id);
  return ids;
};

module.exports = seedClass;
