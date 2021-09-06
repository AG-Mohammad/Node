const express = require("express");
const router = express.Router();
const { users, sellers } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

//================ User ======================
router.post("/Reg", async (req, res) => {
  console.log("===> Adding user <===");
  const user = req.body;

  const CheckMail = await users.count({ where: { email: user.email } });

  if (CheckMail) {
    res.json({ err: "Email Already Exists" });
  } else {
    user.password = bcrypt.hashSync(user.password, 10);
    await users.create(user);
    res.json({ done: "Signed Up" });
  }
});

router.post("/signin", async (req, res) => {
  console.log("===> Checking user <===");
  const user = req.body;

  const done = await users.findOne({
    where: { email: user.email },
    raw: true,
  });
  if (!done) {
    res.json({ err: "Wrong Email" });
  } else {
    bcrypt.compare(user.password, done.password).then((match) => {
      if (match) {
        done.isLogged = "true";
        const auth = sign(done, "secret");
        res.json({ AUth: auth, done: "Logged In", accountType: "user" });
      } else res.json({ err: "Wrong Password" });
    });
  }
});

//===============================================================================

module.exports = router;
