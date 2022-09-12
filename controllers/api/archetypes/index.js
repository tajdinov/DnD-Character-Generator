const router = require("express").Router();
const classRoutes = require("./classes");
const raceRoutes = require("./races");

router.use("/class", classRoutes);
router.use("/race", raceRoutes);

module.exports = router;
