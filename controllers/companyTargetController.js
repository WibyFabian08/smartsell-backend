const CompanyTarget = require("../models/CompanyTarget");
const User = require("../models/User");
const Company = require("../models/Company");

exports.getCompaniesTarget = async (req, res) => {
  try {
    const companiesTarget = await CompanyTarget.find({
      userId: req.params.userId,
    })
      .select("_id userId employeId isContact")
      .populate({
        path: "userId",
        select: "_id username company phone email",
      })
      .populate({
        path: "companyId",
        select: "_id name industry phone website email city",
      });

    return res.status(200).json(companiesTarget);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.getCompanyTarget = async (req, res) => {
  try {
    const companyTarget = await CompanyTarget.findOne({
      userId: req.params.userId,
      companyId: req.params.companyId,
    })
      .select("_id userId employeId isContact")
      .populate({
        path: "userId",
        select: "_id username company phone email",
      })
      .populate({
        path: "companyId",
        select: "_id name industry phone website email city",
      });

    return res.status(200).json(companyTarget);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.createCompanyTarget = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const company = await Company.findOne({ _id: req.body.companyId });

    const newCompanyTarget = {
      userId: user._id,
      companyId: company._id,
    };

    const companyTarget = await CompanyTarget.create(newCompanyTarget);

    return res.status(200).json(companyTarget);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.deleteCompanyTarget = async (req, res) => {
  try {
    await CompanyTarget.deleteOne({ companyId: req.params.id });

    return res.status(200).json({
      message: "deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};
