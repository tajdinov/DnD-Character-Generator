const router = require("express").Router();
const { Class, Race, Character } = require("../model");

router.get("/", async (req, res) => {
  try {
    const data = await Character.findAll();
    const characters = data.map(character => character.get({ plain: true }));
    res.render("homepage", { characters });
  } catch (error) {}
});

router.get("/create", async (req, res) => {
  try {
    const [classData, raceData] = await Promise.all([
      Class.findAll(),
      Race.findAll(),
    ]);
    const classes = classData.map(classItem => classItem.get({ plain: true }));
    const races = raceData.map(race => race.get({ plain: true }));
    res.render("create", { classes, races });
  } catch (error) {
    next(HandledError.databaseError());
  }
});

router.get("/update/:charId", async (req, res) => {
  try {
    const data = await Character.findByPk(req.params.charId);
    if (!data) {
      return res.redirect("/");
    }
    const character = data.get({ plain: true });
    const attributes = Object.entries(character)
      .filter(([key]) =>
        [
          "hit_points",
          "strength",
          "dexterity",
          "constitution",
          "wisdom",
          "intelligence",
        ].includes(key)
      )
      .map(([key, value]) => ({ type: key, value }));
    res.render("update", { ...character, attributes });
  } catch (error) {
    //
  }
});

module.exports = router;
