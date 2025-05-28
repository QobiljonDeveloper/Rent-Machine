const { addUser, getAllUsers } = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/", addUser);
router.get("/", getAllUsers);

module.exports = router;
