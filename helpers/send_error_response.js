const sendErrorResponse = (error, res) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message || "Serverda xatolik yuz berdi",
    error,
  });
};

module.exports = {
  sendErrorResponse,
};
