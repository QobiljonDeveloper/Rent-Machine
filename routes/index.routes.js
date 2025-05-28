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

router.use("/category", categoryRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);
router.use("/status", statusRouter);
router.use("/comission", comissionRouter);
router.use("/users", userRouter);
router.use("/user-address", userAddressRouter);
router.use("/machine", machineRouter);
router.use("/image", imageRouter);
module.exports = router;
