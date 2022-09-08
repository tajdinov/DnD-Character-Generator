const router = require("express").Router();
const authRoute = require("./auth");
const archeTypes = require("./archetypes");

router.use("/auth", authRoute);
router.use("/archetypes", archeTypes);

module.exports = router;
