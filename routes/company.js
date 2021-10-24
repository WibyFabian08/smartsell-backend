const express = require("express");
const router = express.Router();

const companyController = require("../controllers/companyController");
const uploadImage = require("../middlewares/uploadImage");

router.get("/", companyController.getCompanies);
router.get("/find/:id", companyController.getCompany);
router.get("/find/:id/employe", companyController.getCompanyElmpoyes);
router.get("/find/name/search", companyController.getCompanyByName);
router.get("/find/location/search", companyController.getCompanyByLocation);
router.get("/find/industry/search", companyController.getCompanyByIndustry);
router.post("/create", uploadImage, companyController.createCompany);
router.put("/:id/edit", uploadImage, companyController.editCompany);
router.delete("/:id/delete", companyController.deleteCompany);

module.exports = router;
