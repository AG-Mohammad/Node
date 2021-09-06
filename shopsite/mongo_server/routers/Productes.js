const { json } = require("express");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const products = require("../models/product.model");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const name = req.body.name;
    cb(null, `${name}.${ext}`);
  },
});
const upload = multer({ storage: storage });

router.post("/AddProd", upload.single("pic"), async (req, res) => {
  const category = req.body.category;
  const name = req.body.name;
  const desc = req.body.description;
  const seller= req.body.seller
  const pic = `http://localhost:5000/${req.file.path}`;

  const newProduct = new products({
    category,
    name,
    desc,
    pic,
    seller
  });

  newProduct
    .save()
    .then(() => res.json("Product Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/", async (req, res) => {
  products
    .find()
    .then((prod) => res.json(prod))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/", async (req, res) => {
  products
    .findOne({ name: req.body.prod })
    .then((prod) => res.json(prod))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
