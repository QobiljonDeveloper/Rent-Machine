const { sendErrorResponse } = require("../helpers/send_error_response");
const Payment = require("../models/payment.model");
const Contract = require("../models/contract.model");

const addPayment = async (req, res) => {
  try {
    const { payment_date, payment_status, amount, contractId } = req.body;

    const newPayment = await Payment.create({
      payment_date,
      payment_status,
      amount,
      contractId,
    });

    res.status(201).send({ message: "Payment yaratildi", newPayment });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Contract,
          attributes: ["id", "total_price", "date", ],
        }
      ],
    });

    res.status(200).send(payments);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findOne({
      where: { id },
      include: [
        {
          model: Contract,
          attributes: ["id", "total_price", "date", "machineId", "comissionId"],
        },
      ],
    });

    if (!payment) {
      return res.status(404).send({ message: "Payment topilmadi" });
    }

    res.status(200).send(payment);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_date, payment_status, amount, contractId } = req.body;

    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).send({ message: "Payment topilmadi" });
    }

    payment.payment_date = payment_date ?? payment.payment_date;
    payment.payment_status = payment_status ?? payment.payment_status;
    payment.amount = amount ?? payment.amount;
    payment.contractId = contractId ?? payment.contractId;

    await payment.save();

    res.status(200).send({ message: "Payment yangilandi", payment });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).send({ message: "Payment topilmadi" });
    }

    await payment.destroy();

    res.status(200).send({ message: "Payment o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
