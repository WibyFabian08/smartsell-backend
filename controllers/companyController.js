const Company = require("../models/Company");
const fs = require("fs");

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().select(
      "id name industry city phone website email companyPict"
    );

    return res.status(200).json(companies);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id }).select(
      "id name industry city phone website email companyPict"
    );

    if (!company) {
      return res.status(404).json({
        message: "company not found",
      });
    }

    return res.status(200).json(company);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const newCompany = req.body;
    newCompany.companyPict = `images/${req.file.filename}`;

    const company = await Company.create(newCompany);

    return res.status(200).json(company);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.editCompany = async (req, res) => {
  try {
    const updateCompany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (req.file) {
      const path = `public/${updateCompany.companyPict}`;
      fs.unlink(path, (err) => console.log(err));

      updateCompany.companyPict = `images/${req.file.filename}`;
    }

    await updateCompany.save();

    return res.status(200).json(updateCompany);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id });

    const path = `public/${company.companyPict}`;
    fs.unlink(path, (err) => console.log(err));

    await company.delete();

    return res.status(200).json({
      message: "company deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.getCompanyByName = async (req, res) => {
  try {
    const name = new RegExp(req.query.name, "i");
    const company = await Company.find({ name: name }).select(
      "id name industry city phone website email companyPict"
    );

    return res.status(200).json(company);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.getCompanyByLocation = async (req, res) => {
  try {
    const city = new RegExp(req.query.city, "i");
    const company = await Company.find({ city: city }).select(
      "id name industry city phone website email companyPict"
    );

    return res.status(200).json(company);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.getCompanyByIndustry = async (req, res) => {
  try {
    const industry = new RegExp(req.query.industry, "i");
    const company = await Company.find({ industry: industry }).select(
      "id name industry city phone website email companyPict"
    );

    return res.status(200).json(company);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};
