const router = require("express").Router();
const boardsController = require("../../controllers/boardsController");

// Matches with "/api/colours"
router.route("/")
  .get(boardsController.findAll);

module.exports = router;
