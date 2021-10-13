const User = require("../models/User");
const CryptoJS = require("crypto-js");
const fs = require("fs");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: { $ne: true } }).select(
      "_id username email profilePict company address province city phone isAdmin"
    );

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select(
      "_id username email profilePict company address province city phone isAdmin"
    );

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        "secret"
      ).toString();
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (req.file) {
      if (updateUser.profilePict) {
        const path = `public/${updateUser.profilePict}`;
        fs.unlink(path, (err) => console.log(err));
      }
      updateUser.profilePict = `profilePict/${req.file.filename}`;
      await updateUser.save();
    }

    return res.status(200).json(updateUser);
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};
