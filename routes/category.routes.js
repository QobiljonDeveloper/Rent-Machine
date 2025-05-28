const {
  addCategory,
  getAllCategories,
  getById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = require("express").Router();

router.post("/", addCategory);
router.get("/", getAllCategories);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:id", getById);

module.exports = router;
