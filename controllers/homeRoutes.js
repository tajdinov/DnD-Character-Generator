const router = require("express").Router();

router.get("/", (req, res) => {
  // TODO
  res.render("create");
});

module.exports = router;
