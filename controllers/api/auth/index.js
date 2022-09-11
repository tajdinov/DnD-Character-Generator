const router = require("express").Router();
const { User } = require("../../../model");

router.post("/", async (req, res) => {
  // Extract details from req.body for validation
  try {
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
    // Return new user data
    if (newUser) {
      req.session.save(err => {
        if (err) {
          return res.sendStatus(500);
        }
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        res.sendStatus(201);
      });
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/login", async (req, res) => {
  try {
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
        return res.sendStatus(200);
      });
    }
  } catch (error) {
    next(error);
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
