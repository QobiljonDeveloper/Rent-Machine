const {
    addDistrict,
    getAllDistricts,
    getById,
    updateDistrict,
    deleteDistrict,
  } = require("../controllers/district.controller");
  
  const router = require("express").Router();
  
  router.post("/", addDistrict);
  router.get("/", getAllDistricts);
  router.patch("/:id", updateDistrict);
  router.delete("/:id", deleteDistrict);
  router.get("/:id", getById);
  
  module.exports = router;
  