const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CompanyTargetSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    companyId: {
      type: ObjectId,
      ref: "Company",
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

module.exports = mongoose.model("CompanyTarget", CompanyTargetSchema);
