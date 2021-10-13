const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const bytes = CryptoJS.AES.decrypt(user.password, "secret");
    const checkPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (checkPassword !== req.body.password) {
      return res.status(403).json({
        message: "Password Wrong",
      });
    }

    const loggedUser = await User.findOne({ _id: user._id }).select(
      "_id firstName lastName email isAdmin"
    );

    const token = jwt.sign({ data: loggedUser }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      loggedUser,
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

exports.register = async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });

    if (checkEmail) {
      return res.status(500).json({ message: "Email Already Use" });
    }

    const password = CryptoJS.AES.encrypt(
      req.body.password,
      "secret"
    ).toString();

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: password,
    });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
