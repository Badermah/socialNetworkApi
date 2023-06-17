const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: "You need to provide a reaction!",
      maxLength: 280,
    },
    username: {
      type: String,
      required: "You need to provide a username!",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;
