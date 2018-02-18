const router = require("express").Router();
const boardsController = require("../../controllers/boardsController");

// Matches with "/api/boards"
router.route("/")
  .get(boardsController.findAll)
  .post(boardsController.create);

// Matches with "/api/boards/:id"
router
  .route("/:id")
  .get(boardsController.findById)
  .put(boardsController.update)
  .delete(boardsController.remove);

module.exports = router;
