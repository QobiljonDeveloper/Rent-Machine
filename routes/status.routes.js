const {
  addStatus,
  getAllStatus,
  getById,
  updateStatus,
  deleteStatus,
} = require("../controllers/status.controller");

const router = require("express").Router();

router.post("/", addStatus);
router.get("/", getAllStatus);
router.patch("/:id", updateStatus);
router.delete("/:id", deleteStatus);
router.get("/:id", getById);

module.exports = router;
