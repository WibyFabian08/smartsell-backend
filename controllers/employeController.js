const Employe = require("../models/Employe");
const Company = require("../models/Company");

exports.getEmployes = async (req, res) => {
  try {
    const employes = await Employe.find()
      .select("_id name personalPhone officePhone email position companyId")
      .populate({
        path: "companyId",
        select: "_id name industry phone email website city",
      });

    return res.status(200).json(employes);
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

exports.getEmploye = async (req, res) => {
  try {
    const employe = await Employe.findOne({ _id: req.params.id })
      .select("_id name personalPhone officePhone email position companyId")
      .populate({
        path: "companyId",
        select: "_id name industry phone email website city",
      });

    return res.status(200).json(employe);
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

exports.createEmploye = async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.companyId });
    const newEmploye = await Employe.create(req.body);

    newEmploye.companyId = company._id;
    await newEmploye.save();

    company.employeId.push({ _id: newEmploye._id });
    await company.save();

    return res.status(200).json(newEmploye);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.editEmploye = async (req, res) => {
  try {
    const updateEmploye = await Employe.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(200).json(updateEmploye);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.deleteEmploye = async (req, res) => {
  try {
    const employe = await Employe.findOne({ _id: req.params.id });
    const company = await Company.findOne({ _id: employe.companyId });

    company.employeId.pull({ _id: employe._id });
    await company.save();

    await employe.delete();

    return res.status(200).json({
      message: "employe deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.getEmployeByName = async (req, res) => {
  try {
    const name = new RegExp(req.query.name, "i");
    const employe = await Employe.find({ name: name })
      .select("_id name personalPhone officePhone email position companyId")
      .populate({
        path: "companyId",
        select: "_id name industry phone email website city",
      });

    return res.status(200).json(employe);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.getEmployeByPosition = async (req, res) => {
  try {
    const position = new RegExp(req.query.position, "i");
    const employe = await Employe.find({ position: position })
      .select("_id name personalPhone officePhone email position companyId")
      .populate({
        path: "companyId",
        select: "_id name industry phone email website city",
      });

    return res.status(200).json(employe);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};
