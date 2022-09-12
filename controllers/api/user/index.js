const router = require("express").Router();
const withAuth = require("../../../utils/auth");
const characterRoute = require("./characters");

router.use("/character", withAuth, characterRoute);

module.exports = router;
