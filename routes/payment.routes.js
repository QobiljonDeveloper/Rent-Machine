const express = require("express");
const router = express.Router();

const {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controller");

router.post("/", addPayment);
router.get("/", getAllPayments);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);
router.get("/:id", getPaymentById);

module.exports = router;
