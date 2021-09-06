const router = require("express").Router();
let User = require("../models/user.model");

router.get("/", async (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.post("/add", async (req, res) => {
  const fName = req.body.fName;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const gender = req.body.gender;
  const address = req.body.address;
  const role = req.body.role;

  const newUser = new User({
    fName,
    email,
    password,
    phoneNumber,
    gender,
    address,
    role,
  });

  newUser
    .save()
    .then(() => res.json("User Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
