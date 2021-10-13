const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const EmployeSchema = new Schema(
  {
    name: {
      type: String,
    },
    personalPhone: {
      type: String,
    },
    officePhone: {
      type: String,
    },
    email: {
      type: String,
    },
    position: {
      type: String,
    },
    companyId: {
      type: ObjectId,
      ref: "Company",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employe", EmployeSchema);
