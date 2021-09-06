const router = require("express").Router();
let RolePerm = require("../models/rolesPerm.model");
let Role = require("../models/roles.model");

router.get("/", async (req, res) => {
  RolePerm.find()
    .then((role) => res.json(role))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.post("/role", async (req, res) => {
  RolePerm.findOne({ role: req.body.value })
    .then((role) => res.json(role))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.post("/add", async (req, res) => {
  const role = req.body.role;
  delete req.body.role;
  const Permission = req.body;
  const newRolePerms = {
    role,
    Permission,
  };
  console.log(newRolePerms);

  await RolePerm.findOneAndUpdate({ role: role }, newRolePerms, {
    upsert: true,
  })
    .then(() => res.json("Role Permissions Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
