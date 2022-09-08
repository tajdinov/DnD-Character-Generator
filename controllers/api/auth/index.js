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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(400);
  }
  const userData = await User.findOne({ where: { email } });
  if (!userData) {
    return res.sendStatus(400);
  }

  const validPassword = await userData.checkPassword(password);

  if (validPassword) {
    req.session.save(err => {
      if (err) {
        return res.sendStatus(500);
      }
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      return res.status(200).json({ user: userData });
    });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.sendStatus(204);
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
