const {
  addMachine,
  getAllMachines,
  getById,
  updateMachine,
  deleteMachine,
  getMachinesByRegionAndDistrict,
  getMachinesWithImg,
} = require("../controllers/machine.controller");

const router = require("express").Router();

router.post("/", addMachine);
router.get("/", getAllMachines);
router.get("/images", getMachinesWithImg);
router.post("/query", getMachinesByRegionAndDistrict);
router.patch("/:id", updateMachine);
router.delete("/:id", deleteMachine);
router.get("/:id", getById);

module.exports = router;
