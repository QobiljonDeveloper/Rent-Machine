const {
  addUserAddress,
  getAllUserAddress,
  getUserAddressById,
  updateUserAddress,
  deleteUserAddress,
} = require("../controllers/user.address.controller");
const authGuard = require("../middleware/guards/auth.guard");
const roleGuard = require("../middleware/guards/role.guard");
const selfGuard = require("../middleware/guards/self.guard");

const router = require("express").Router();

router.post("/", addUserAddress);
router.get(
  "/",
  authGuard,
  roleGuard(["talim", "superadmin"]),
  getAllUserAddress
);
router.get("/:id", authGuard, getUserAddressById);
router.patch("/:id", authGuard, selfGuard, updateUserAddress);
router.delete("/:id", authGuard, selfGuard, deleteUserAddress);

module.exports = router;
