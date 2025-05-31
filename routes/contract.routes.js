const {
  addContract,
  getAllContract,
  getContractById,
  updateContract,
  deleteContract,
  getContractUserMachines,
  getCancelledContracts,
} = require("../controllers/contract.controller");

const router = require("express").Router();

router.post("/", addContract);
router.post("/add", getContractUserMachines);
router.post("/status", getCancelledContracts);
router.get("/", getAllContract);
router.patch("/:id", updateContract);
router.delete("/:id", deleteContract);
router.get("/:id", getContractById);

module.exports = router;
