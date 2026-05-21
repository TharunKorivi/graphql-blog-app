import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        body: { type: String, required: true },
    },
    { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
