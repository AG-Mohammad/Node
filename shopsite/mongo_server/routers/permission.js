const router = require("express").Router();
let Perm = require("../models/permissions.model");

router.get("/", async (req, res) => {
  Perm.find()
    .then((perms) => res.json(perms))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.post("/add", async (req, res) => {
  const permission = req.body.permission;
  const desc = req.body.desc;

  const newPerm = new Perm({
    permission,
    desc,
  });

  newPerm
    .save()
    .then(() => res.json("Permission Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
