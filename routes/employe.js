const express = require("express");
const router = express.Router();
const uploadExcel = require('../middlewares/uploadExcel');

const employeController = require("../controllers/employeController");

router.get("/", employeController.getEmployes);
router.get("/:id", employeController.getEmploye);
router.get("/find/name/search", employeController.getEmployeByName);
router.get("/find/position/search", employeController.getEmployeByPosition);
router.post("/:companyId/create", employeController.createEmploye);
router.post("/create_by_import_excel", uploadExcel, employeController.createByExcel);
router.put("/:id/edit", employeController.editEmploye);
router.delete("/:id/delete", employeController.deleteEmploye);

module.exports = router;
