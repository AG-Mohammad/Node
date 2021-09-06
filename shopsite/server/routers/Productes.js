const express = require("express");
const router = express.Router();
const multer = require("multer");
const { products } = require("../models");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const name = file.originalname.split(".")[0];
    let date = new Date();
    cb(
      null,
      `${name}-${date.getDate()}${
        date.getMonth() + 1
      }${date.getFullYear()}.${ext}`
    );
  },
});
const upload = multer({ storage: storage });

router.post("/AddProd", upload.single("pic"), async (req, res) => {
  const data = {
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    pic: `http://localhost:4400/${req.file.path}`,
  };
  const data2 = req.body;
  await products.create(data);
  res.json(req.statusCode);
});

router.get("/", async (req, res) => {
  const prod = await products.findAll({ offset: 0, limit: 100 });
  res.json(prod);
});

router.post("/", async (req, res) => {
 
  const prod = await products.findOne({
    where: { id: req.body.prod },
    raw: true,
  });
  res.json(prod);
});

module.exports = router;
