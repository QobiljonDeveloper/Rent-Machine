const {
  addUserRole,
  getAllUserRoles,
  getById,
  deleteUserRole,
} = require("../controllers/user_role.controller");

const router = require("express").Router();

router.post("/", addUserRole);
router.get("/", getAllUserRoles);
router.get("/:id", getById);
router.post("/remove", deleteUserRole);

module.exports = router;
