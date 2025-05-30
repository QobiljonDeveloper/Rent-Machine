const {
  addUserAddress,
  getAllUserAddress,
} = require("../controllers/user.address.controller");
const authGuard = require("../middleware/guards/auth.guard");

const router = require("express").Router();

router.post("/", addUserAddress);
router.get("/", authGuard, getAllUserAddress);

module.exports = router;
