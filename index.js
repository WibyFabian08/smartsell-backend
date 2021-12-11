const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors')
const path = require("path");

const authRouter = require("./routes/auth");
const companyRouter = require("./routes/company");
const employeRouter = require("./routes/employe");
const userRouter = require("./routes/user");
const userTargetRouter = require("./routes/userTarget");
const companyTargetRouter = require("./routes/companyTarget");

// cors origin
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(cors())

dotenv.config();
app.use(express.json({ urlencoded: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRouter);
app.use("/api/company", companyRouter);
app.use("/api/employe", employeRouter);
app.use("/api/user", userRouter);
app.use("/api/user-target", userTargetRouter);
app.use("/api/company-target", companyTargetRouter);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server run om port 5000 and database connected");
  });
});
