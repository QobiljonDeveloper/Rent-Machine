const { addImage } = require("../controllers/images.controller");

const router = require("express").Router();

router.post("/", addImage);

module.exports = router;
