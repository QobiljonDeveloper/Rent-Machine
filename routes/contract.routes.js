const {
  addContract,
  getAllContract,
  getContractById,
  updateContract,
  deleteContract,
} = require("../controllers/contract.controller");

const router = require("express").Router();

router.post("/", addContract);
router.get("/", getAllContract);
router.patch("/:id", updateContract);
router.delete("/:id", deleteContract);
router.get("/:id", getContractById);

module.exports = router;
