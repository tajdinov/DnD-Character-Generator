const router = require("express").Router();
const authRoute = require("./auth");
const archeTypes = require("./archetypes");
const userRoute = require("./user");
const withAuth = require("../../utils/auth");

router.use("/auth", authRoute);
router.use("/archetypes", archeTypes);
router.use("/user", withAuth, userRoute);

module.exports = router;
