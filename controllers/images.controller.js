const { sendErrorResponse } = require("../helpers/send_error_response");
const Machine = require("../models/machine.model");
const Images = require("../models/images.model");

const addImage = async (req, res) => {
  try {
    const { image_url, machineId } = req.body;

    const machine = await Machine.findByPk(machineId);
    if (!machine) {
      return sendErrorResponse({ message: "Bunday Machine mavjud emas" }, res);
    }

    const newImage = await Images.create({
      image_url,
      machineId,
    });

    res.status(201).send({ message: "Image yaratildi", newImage });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addImage,
};
