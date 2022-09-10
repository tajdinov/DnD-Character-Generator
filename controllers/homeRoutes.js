const router = require("express").Router();

router.get("/", (req, res) => {
  // TODO
  res.render("update");
});

module.exports = router;
