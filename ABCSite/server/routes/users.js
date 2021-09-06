const express = require("express");
const router = express.Router();
const { users, Permissions } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

//get all users
router.get("/", async (req, res) => {
  console.log("===> Getting data <===");
  const listOfUsers = await users.findAll();
  res.json(listOfUsers);
});

//signup as user
router.post("/signup", async (req, res) => {
  console.log("===> Adding user <===");
  const user = req.body;
  const CheckMail = await users.count({ where: { email: user.email } });

  if (CheckMail) {
    res.json({ err: "Email Already Exists" });
  } else {
    user.password = bcrypt.hashSync(user.password, 10);

    await users.create(user);
    const UserInfo = await users.findOne({
      where: { email: user.email },
      raw: true,
    });
    console.log("user Info", UserInfo.id);
    await Permissions.create({
      UserID: UserInfo.id,
      isAdmin: false,
      ViewComp: false,
      CreatComp: false,
    });
    res.json({ done: "Signed Up" });
  }
});

// router.post("/signupforadmin", async (req, res) => {
//   console.log("===> Adding Admin <===");
//   const user = req.body;
//   user.isAdmin = 1;
//   const CheckMail = await users.count({ where: { email: user.email } });
//   if (CheckMail) {
//     res.json({ err: "Email Already Exists" });
//   } else {
//     user.password = bcrypt.hashSync(user.password, 10);
//     await users.create(user);
//     res.json({ done: "Signed Up" });
//   }
// });

//check user login info
router.post("/signin", async (req, res) => {
  console.log("===> Checking user <===");

  const user = req.body;
  const done = await users.findOne({
    where: { email: user.email },
    raw: true,
  });
  const done2 = await Permissions.findOne({
    where: { UserID: done.id },
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
            id: done.id,
            mail: done.email,
            isLogged: true,
            Permissions:{
              isAdmin:done2.isAdmin,
              ViewComp:done2.ViewComp,
              CreatComp:done2.CreatComp
            }
          },
          "secret"
        );
        res.json({ AUth: auth, done: "Logged In" });
      } else res.json({ err: "Wrong Password" });
    });
  }
});

/*
router.post("/reset", async (req, res) => {
  console.log("checking user");
  const user = req.body;
  const done = await users.findOne({
    where: { email: user.email },
    raw: true,
  });
  if (!done) {
    res.json({ err: "Email does not exist" });
  } else {
    const pass2= user.password
    const match =  stringSimilarity.compareTwoStrings(pass2, done.password);
    if(match >= 0.10) res.json({ AUth: auth, done: "Success" });
    else res.json({ err: "Wrong Password" });
  }

});
*/
module.exports = router;
