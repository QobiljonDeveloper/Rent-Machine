const { addRole, getAllRoles } = require("../controllers/roles.controller");

const router = require("express").Router();

router.post("/", addRole);
router.get("/", getAllRoles);

module.exports = router;
