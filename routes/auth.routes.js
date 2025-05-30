const { login, logout, refreshToken } = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

module.exports = router;
