const router = require("express").Router();
let Role = require("../models/roles.model");

router.get("/", async (req, res) => {
  Role.find()
    .then((role) => res.json(role))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.post("/add", async (req, res) => {
  const roleName = req.body.roleName;
  const desc = req.body.desc;

  const newRole = new Role({
    roleName,
    desc,
  });

  newRole
    .save()
    .then(() => res.json("Role Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
