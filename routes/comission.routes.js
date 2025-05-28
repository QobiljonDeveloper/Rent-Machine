const {
    addComission,
    getAllComissions,
    getById,
    updateComission,
    deleteComission,
  } = require("../controllers/comission.controller");
  
  const router = require("express").Router();
  
  router.post("/", addComission);
  router.get("/", getAllComissions);
  router.patch("/:id", updateComission);
  router.delete("/:id", deleteComission);
  router.get("/:id", getById);
  
  module.exports = router;
  