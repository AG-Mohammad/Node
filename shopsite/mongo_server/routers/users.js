const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.get("/", async (req, res) => {
  console.log("All users");
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.post("/Reg", async (req, res) => {
  console.log("Signing up");

  const fName = req.body.fName;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);
  const phoneNumber = req.body.phoneNumber;
  const gender = req.body.gender;
  const address = req.body.address;
  const role = "User";

  const newUser = new User({
    fName,
    email,
    password,
    phoneNumber,
    gender,
    address,
    role,
  });

  const CheckMail = await User.countDocuments({ email: email });
  if (CheckMail) {
    res.json("Error : Email already exists");
  } else {
    newUser
      .save()
      .then(() => res.json("User Added"))
      .catch((err) => res.status(400).json("Error: " + err));
  }
});

router.post("/signin", async (req, res) => {
  console.log("Loging In");

  let user = await User.findOne({ email: req.body.email }).lean();
  if (!user) {
    res.json({ err: "Wrong Email" });
  } else {
    bcrypt.compare(req.body.password, user.password).then((match) => {
      if (match) {
        user.isLogged = "true";
        const auth = sign(user, "secret");
        res.json({ Auth: auth, done: "Logged In", role: user.role });
      } else res.json({ err: "Wrong Password" });
    });
  }
});

module.exports = router;
