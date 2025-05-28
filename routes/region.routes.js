const {
  addRegion,
  getAllRegions,
  getById,
  updateRegion,
  deleteRegion,
} = require("../controllers/region.controller");

const router = require("express").Router();

router.post("/", addRegion);
router.get("/", getAllRegions);
router.patch("/:id", updateRegion);
router.delete("/:id", deleteRegion);
router.get("/:id", getById);

module.exports = router;
