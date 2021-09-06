const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rolePermsSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true
    },
    Permission: {
      type: Map,
      required: true,
      unique: false
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

const rolePerms = mongoose.model("rolePerms", rolePermsSchema);

module.exports = rolePerms;
