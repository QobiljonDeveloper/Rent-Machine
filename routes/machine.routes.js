const {
    addMachine,
    getAllMachines,
    getById,
    updateMachine,
    deleteMachine,
  } = require("../controllers/machine.controller");
  
  const router = require("express").Router();
  
  router.post("/", addMachine);
  router.get("/", getAllMachines);
  router.patch("/:id", updateMachine);
  router.delete("/:id", deleteMachine);
  router.get("/:id", getById);
  
  module.exports = router;
  