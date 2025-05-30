const { sendErrorResponse } = require("../helpers/send_error_response");
const Review = require("../models/review.model");
const Machine = require("../models/machine.model");
const User = require("../models/users.model");

const addReview = async (req, res) => {
  try {
    const { rating, comment, machineId, userId } = req.body;

    const newReview = await Review.create({
      rating,
      comment,
      machineId,
      userId,
    });

    res.status(201).send({ message: "Review yaratildi", newReview });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: Machine,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["full_name"],
        },
      ],
    });

    res.status(200).send(reviews);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findOne({
      where: { id },
      include: [
        {
          model: Machine,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["full_name"],
        },
      ],
    });

    if (!review) {
      return res.status(404).send({ message: "Review topilmadi" });
    }

    res.status(200).send(review);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, machineId, userId } = req.body;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).send({ message: "Review topilmadi" });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    review.machineId = machineId ?? review.machineId;
    review.userId = userId ?? review.userId;

    await review.save();

    res.status(200).send({ message: "Review yangilandi", review });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).send({ message: "Review topilmadi" });
    }

    await review.destroy();

    res.status(200).send({ message: "Review o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
