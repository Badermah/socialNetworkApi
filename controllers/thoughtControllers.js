const { Thought, User, Reaction } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate({
        path: "reactions",
        select: "-__v",
      });
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async getAThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id }).populate({
        path: "reactions",
        select: "-__v",
      });
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: reaction._id } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndDelete({
        _id: req.params.reactionId,
      });
      if (!reaction) {
        return res.status(404).json({ message: "No reaction with that ID" });
      }
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
