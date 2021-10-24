const UserTarget = require("../models/UserTarget");
const User = require("../models/User");
const Employe = require("../models/Employe");

exports.getUsersTarget = async (req, res) => {
  try {
    const usersTarget = await UserTarget.find({ userId: req.params.userId })
      .select("_id userId employeId isContact")
      .populate({
        path: "userId",
        select: "_id username company phone email",
      })
      .populate({
        path: "employeId",
        select: "_id name email position officePhone companyId",
        populate: {
          path: "companyId",
          select: "_id name website email phone",
        },
      });

    return res.status(200).json(usersTarget);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.getUserTarget = async (req, res) => {
  try {
    const userTarget = await UserTarget.findOne({
      userId: req.params.userId,
      employeId: req.params.employeId,
    })
      .select("_id userId employeId isContact")
      .populate({
        path: "userId",
        select: "_id username company phone email",
      })
      .populate({
        path: "employeId",
        select: "_id name email position officePhone companyId",
        populate: {
          path: "companyId",
          select: "_id name website email phone",
        },
      });

    return res.status(200).json(userTarget);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.createUserTarget = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const employe = await Employe.findOne({ _id: req.body.employeId });

    const newUserTarget = {
      userId: user._id,
      employeId: employe._id,
    };

    const userTarget = await UserTarget.create(newUserTarget);

    return res.status(200).json(userTarget);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.deleteUserTarget = async (req, res) => {
  try {
    await UserTarget.deleteOne({ employeId: req.params.id });

    return res.status(200).json({
      message: "deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};
