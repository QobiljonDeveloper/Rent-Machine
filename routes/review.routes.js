const express = require("express");
const router = express.Router();

const {
  addReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

router.post("/", addReview);
router.get("/", getAllReviews);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.get("/:id", getReviewById);

module.exports = router;
