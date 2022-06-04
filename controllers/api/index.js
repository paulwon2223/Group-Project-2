const router = require("express").Router();

const userRoutes = require("./userRoute");
const dashRoutes = require("./dashRoute");

router.use("/users", userRoutes);
router.use("/dashboard", dashRoutes);

module.exports = router;