/* create an endpoint for the Class model that returns a single class in the database */

// import the Class model
const { Class } = require("../../../model");

// create a GET route for the Class model
const router = require("express").Router();

router.get("/", (req, res) => {
  // access our Class model and run .findAll() method
  Class.findAll()
    .then(dbClassData => res.json(dbClassData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Class.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(dbClassData => {
      if (!dbClassData) {
        res.status(404).json({ message: "No class found with this id" });
        return;
      }
      res.json(dbClassData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
