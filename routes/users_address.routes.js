const {
  addUserAddress,
  getAllUserAddress,
} = require("../controllers/user.address.controller");

const router = require("express").Router();

router.post("/", addUserAddress);
router.get("/", getAllUserAddress);

module.exports = router;
