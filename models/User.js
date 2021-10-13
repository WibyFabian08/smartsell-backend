const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    company: {
      type: String,
    },
    address: {
      type: String,
    },
    province: {
      type: String,
    },
    city: {
      type: String,
    },
    postCode: {
      type: String,
    },
    phone: {
      type: String,
    },
    profilePict: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
