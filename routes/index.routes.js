const router = require("express").Router();

const categoryRouter = require("./category.routes");
const regionRouter = require("./region.routes");
const districtRouter = require("./district.routes");
const statusRouter = require("./status.routes");
const comissionRouter = require("./comission.routes");
const userRouter = require("./user.routes");
const userAddressRouter = require("./users_address.routes");
const machineRouter = require("./machine.routes");
const imageRouter = require("./images.routes");
const rolesRouter = require("./roles.routes");
const userRolesRouter = require("./user_roles.routes");
const authRouter = require("./auth.routes");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/category", categoryRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);
router.use("/status", statusRouter);
router.use("/comission", comissionRouter);
router.use("/user-address", userAddressRouter);
router.use("/machine", machineRouter);
router.use("/image", imageRouter);
router.use("/role", rolesRouter);
router.use("/user-role", userRolesRouter);

module.exports = router;
