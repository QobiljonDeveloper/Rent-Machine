const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const userRoleNames = req.user.roles.map((r) => r.name);

      const hasRole = requiredRoles.some((role) =>
        userRoleNames.includes(role)
      );

      if (!hasRole) {
        return sendErrorResponse(
          { message: "Sizda bu routega kirish uchun huquq yo'q" },
          res
        );
      }

      next();
    } catch (error) {
      sendErrorResponse(error, res);
    }
  };
};
