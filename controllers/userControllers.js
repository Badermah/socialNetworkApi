const { User, Thought } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate({
        path: "thoughts",
        select: "-__v",
      });
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async getAUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id }).populate({
        path: "thoughts",
        select: "-__v",
      });
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
   async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};
