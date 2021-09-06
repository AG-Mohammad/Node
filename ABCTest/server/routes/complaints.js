const express = require("express");
const router = express.Router();
const { complaints, users } = require("../models");
const { validToken } = require("../middleware/authMiddleware");

//get complaint data
router.get("/:id", async (req, res) => {
  const Complaint = await complaints.findAll({
    where: {
      Id: req.params.id,
    },
  });
  res.send(Complaint);
});

//get user's complaint
//get all complaints
router.get("/", validToken, async (req, res) => {
  console.log("getting data");
  if (req.userData.isAdmin) {
    const listOfComplaints = await complaints.findAll();
    res.json(listOfComplaints);
  } else {
    console.log("checking user complaints");
    const UserComplaints = await complaints.findAll({
      where: {
        userId: req.userData.id,
      },
    });
    res.json(UserComplaints);
  }
});

// add complaint
router.post("/new", async (req, res) => {
  console.log("adding complaint");
  const complaint = req.body;
  await complaints.create(complaint);
  res.json("done");
});

router.put("/:id", validToken, async (req, res) => {
  const User = await users.findOne({
    where: { id: req.body.id },
    raw: true,
  });
  console.log("ID", req.params.id);
  complaints.update({ openedBy: User.fName }, { where: { id: req.params.id } });
  res.json("updated");
});

router.put("/updatestatus/:id", validToken, async (req, res) => {
  console.log("updating stat");
  complaints.update(
    { status: req.body.changeStat },
    { where: { id: req.params.id } }
  );
});

module.exports = router;
