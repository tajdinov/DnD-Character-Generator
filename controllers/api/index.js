const router = require("express").Router();
const authRoute = require("./auth");
const archeTypes = require("./archetypes");
const userRoute = require("./user");

router.use("/auth", authRoute);
router.use("/archetypes", archeTypes);
router.use("/user", userRoute);

module.exports = router;
