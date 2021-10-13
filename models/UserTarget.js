const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const UserTargetSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    employeId: {
      type: ObjectId,
      ref: "Employe",
    },
    isContact: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserTarget", UserTargetSchema);
