const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CompanySchema = new Schema(
  {
    name: {
      type: String,
    },
    industry: {
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
    country: {
      type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    email: {
      type: String,
    },
    employeId: [
      {
        type: ObjectId,
        ref: "Employe",
      },
    ],
    companyPict: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", CompanySchema);
