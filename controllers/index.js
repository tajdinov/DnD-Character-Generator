const router = require("express").Router();
const withAuth = require("../utils/auth");
const apiRoutes = require("./api");
const loginRoutes = require("./loginRoutes");
const homeRoutes = require("./homeRoutes");

router.use("/api", apiRoutes);

router.use("/", loginRoutes);
router.use("/", withAuth, homeRoutes);

module.exports = router;
