const router = require("express").Router();
const {
  getAllThoughts,
  getAThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtControllers");

router.route("/").get(getAllThoughts).post(createThought);

router.route("/:id").get(getAThought).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
