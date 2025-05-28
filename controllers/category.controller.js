const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await Category.create({ name });

    res.status(201).send({ message: "Category yaratildi", newCategory });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    res.status(200).send(category);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Bunday category mavjud emas" });
    }
    category.name = name;
    await category.save();
    res.status(200).send({ message: "Category yangilandi", category });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Bunday category mavjud emas" });
    }
    await category.destroy();
    res.status(200).send({ message: "Category o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getById,
  updateCategory,
  deleteCategory,
};
