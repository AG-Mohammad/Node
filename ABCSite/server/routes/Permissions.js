const express = require("express");
const router = express.Router();
const { Permissions } = require("../models");

router.post("/", async (req, res) => {
  console.log("===> Checking Permissions <===");
  let user = req.body;
  const permis = await Permissions.findOne({
    where: { UserID: user.id },
    raw: true,
  });

  res.json(permis);
});

router.put("/update", async (req, res) => {
  console.log("===> Updating Permissions <===");

  let perms = req.body;
  console.log(perms);
  Permissions.update(
    {
      isAdmin: +perms.Admin,
      ViewComp: +perms.ViewComp,
      CreatComp: +perms.CreateComp,
    },
    { where: { UserID: perms.UserId } }
  );
});

module.exports = router;
