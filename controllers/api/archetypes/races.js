/* create an endpoint for the Race model that returns a single race in the database */

// import the Race model
const { Race } = require("../../../model");

// create a GET route for the Race model
const router = require("express").Router();

router.get("/", (req, res) => {
  // access our Race model and run .findAll() method
  Race.findAll()
    .then(dbRaceData => res.json(dbRaceData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Race.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(dbRaceData => {
      if (!dbRaceData) {
        res.status(404).json({ message: "No race found with this id" });
        return;
      }
      res.json(dbRaceData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
