const router = require("express").Router();
const { User } = require("../../../model");

router.post("/", async (req, res) => {
  // Extract details from req.body for validation
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.sendStatus(400);
  }
  // Check if email already exists in database, if it does return 'bad request'
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.sendStatus(400);
  }

  // Create the user
  const newUser = await User.create(req.body);
  res.json({ newUser });
});

router.post("/login", (req, res) => {
  // TODO
});

router.post("/logout", (req, res) => {
  // TODO
});

module.exports = router;
