const express = require("express");
const router = express.Router();

const companyTargetController = require("../controllers/companyTargetController");

router.get("/:userId", companyTargetController.getCompaniesTarget);
router.get(
  "/find/:userId/:companyId",
  companyTargetController.getCompanyTarget
);
router.post("/create", companyTargetController.createCompanyTarget);
router.delete("/:id/delete", companyTargetController.deleteCompanyTarget);

module.exports = router;
