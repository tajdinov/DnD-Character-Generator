const { User } = require("../model");

const withAuth = async (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    const user = await User.findByPk(req.session.user_id);
    if (!user) {
      req.session.destroy(() => {
        res.redirect("/login");
      });
    } else {
      res.locals.logged_in = true;
      next();
    }
  }
};

module.exports = withAuth;
