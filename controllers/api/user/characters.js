const router = require("express").Router();
const { Character } = require("../../../model");

router.post("/", async (req, res, next) => {
  try {
    const { user_id } = req.session;
    const character = await Character.create({ ...req.body, user_id });
    res.json(character);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
