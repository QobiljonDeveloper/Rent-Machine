const {
  addMachine,
  getAllMachines,
  getById,
  updateMachine,
  deleteMachine,
  getMachinesByRegionAndDistrict,
} = require("../controllers/machine.controller");

const router = require("express").Router();

router.post("/", addMachine);
router.get("/", getAllMachines);
router.post("/query", getMachinesByRegionAndDistrict);
router.patch("/:id", updateMachine);
router.delete("/:id", deleteMachine);
router.get("/:id", getById);

module.exports = router;
