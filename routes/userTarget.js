const express = require("express");
const router = express.Router();

const userTargetController = require("../controllers/userTargetController");

router.get("/:userId", userTargetController.getUsersTarget);
router.get("/find/:userId/:employeId", userTargetController.getUserTarget);
router.post("/create", userTargetController.createUserTarget);
router.delete("/:id/delete", userTargetController.deleteUserTarget);

module.exports = router;
