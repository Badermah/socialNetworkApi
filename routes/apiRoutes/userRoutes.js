const router = require("express").Router();

const {
  getAllUsers,
  getAUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userControllers");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getAUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
