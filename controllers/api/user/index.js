const router = require("express").Router();
const characterRoute = require("./characters");

router.use("/character", characterRoute);

module.exports = router;
