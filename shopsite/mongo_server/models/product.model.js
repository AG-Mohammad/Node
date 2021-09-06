const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
      },
    desc: {
      type: String,
      required: true,
    },
    pic: {
        type: String,
        required: true,
      },
      seller: {
        type: String,
        required: true,
      },
  },
  {
    toObject: {
      virtuals: true,
    },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("products", productsSchema);

module.exports = products;
