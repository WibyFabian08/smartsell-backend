const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const uploadProfile = require("../middlewares/uploadProfile");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.put("/:id/edit", uploadProfile, userController.editUser);
router.delete('/:id/delete', userController.deleteUser);

module.exports = router;
