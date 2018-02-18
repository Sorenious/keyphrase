const router = require("express").Router();
const boardRoutes = require("./boards");
const colourRoutes = require("./colours");

// Board routes
router.use("/boards", boardRoutes);

// Colour routes
router.use("/colours", colourRoutes);

module.exports = router;
