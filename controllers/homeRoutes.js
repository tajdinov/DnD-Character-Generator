const router = require("express").Router();
const { Class, Race, Character, User } = require("../model");
const HandledError = require("../error/Error");
const Attribute = require("../model/Attribute");

router.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.session;

    if (!user_id) return next(HandledError.unauthorised());
    const user = await User.findByPk(user_id);
    const data = await Character.findAll({ where: { user_id } });
    const characters = data.map(character => character.get({ plain: true }));
    res.render("homepage", { characters, first_name: user.first_name });
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

router.get("/update/:charId", async (req, res, next) => {
  try {
    const data = await Character.findByPk(req.params.charId, {
      include: [
        { model: Attribute, as: "attributes" },
        { model: Class, as: "class" },
        { model: Race, as: "race" },
      ],
    });
    if (!data) {
      return res.redirect("/");
    }
    const character = data.get({ plain: true });
    res.render("update", { ...character });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
