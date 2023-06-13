const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: "Reaction is required",
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: "Username is required",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;
