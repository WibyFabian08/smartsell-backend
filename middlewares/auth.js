const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decodedData;

      next();
    } else {
      res.status(403).json({ message: "unauthorization" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = auth;
