const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const permsSchema = new Schema(
  {
    permission: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    desc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Perms = mongoose.model("Perms", permsSchema);

module.exports = Perms;
