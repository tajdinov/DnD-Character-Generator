const router = require("express").Router();
const { User } = require("../../../model");
const HandledError = require("../../../error/Error");

router.post("/", async (req, res, next) => {
  // Extract details from req.body for validation
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return next(HandledError.badRequest());
  }
  // Check if email already exists in database, if it does return 'bad request'
  const user = await User.findOne({ where: { email } });
  if (user) {
    return next(HandledError.badRequest());
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
  const { email, password } = req.body;
  if (!email || !password) {
    return next(HandledError.badRequest());
  }
  const userData = await User.findOne({ where: { email } });
  if (!userData) {
    return next(HandledError.invalidCredentials());
  }

  const validPassword = await userData.checkPassword(password);

  if (!validPassword) {
    return next(HandledError.invalidCredentials());
  }

  req.session.save(err => {
    if (err) {
      return next(HandledError.databaseError());
    }
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    return res.status(200).json({ user: userData });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.sendStatus(204);
    });
  } else {
    next(HandledError.badRequest());
  }
});

module.exports = router;
