const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

//get all users
router.get("/", async (req, res) => {
  console.log("getting data");
  const listOfUsers = await users.findAll();
  res.json(listOfUsers);
});

//signup as user/admin
router.post("/signup", async (req, res) => {
  console.log("adding user");
  const user = req.body;
  user.isAdmin = 0
  const CheckMail = await users.count({ where: { email: user.email } });
  console.log(CheckMail);
  if (CheckMail) {
    res.json({ err: "Email Already Exists" });
  } else {
    user.password = bcrypt.hashSync(user.password, 10);
    await users.create(user);
    res.json("done");
  }
});
router.post("/signupforadmin", async (req, res) => {
  console.log("adding Admin");
  const user = req.body;
  user.isAdmin = 1
  const CheckMail = await users.count({ where: { email: user.email } });
  console.log(CheckMail);
  if (CheckMail) {
    res.json({ err: "Email Already Exists" });
  } else {
    user.password = bcrypt.hashSync(user.password, 10);
    await users.create(user);
    res.json("done");
  }
});

//check user login info
router.post("/signin", async (req, res) => {
  console.log("checking user");

  const user = req.body;
  console.log(req.body);
  const done = await users.findOne({
    where: { email: user.email },
    raw: true,
  });
  if (!done) {
    res.json({ err: "Wrong Email" });
  } else {
    bcrypt.compare(user.password, done.password).then((match) => {
      if (match) {
        const auth = sign(
          {
            name: done.fName,
            isAdmin: done.isAdmin,
            id: done.id,
            mail: done.email,
            isLogged: true,
          },
          "secret"
        );
        res.json(auth);
      } else res.json({ err: "Wrong Password" });
    });
  }
});

module.exports = router;
