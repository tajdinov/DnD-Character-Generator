const router = require("express").Router();

router.get("/", (req, res) => {
  // TODO
  res.render("homepage");
});

module.exports = router;
