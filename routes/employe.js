const express = require("express");
const router = express.Router();

const employeController = require("../controllers/employeController");

router.get("/", employeController.getEmployes);
router.get("/:id", employeController.getEmploye);
router.get("/find/name/search", employeController.getEmployeByName);
router.get("/find/position/search", employeController.getEmployeByPosition);
router.post("/:companyId/create", employeController.createEmploye);
router.put("/:id/edit", employeController.editEmploye);
router.delete("/:id/delete", employeController.deleteEmploye);

module.exports = router;
