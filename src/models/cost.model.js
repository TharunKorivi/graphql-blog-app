import mongoose, { Schema } from "mongoose";
import { AvailablePostStatuses } from "../utils/constants.js";

const postSchema = new mongoose.Schema(
    {
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: { type: String, required: true, trim: true },
        body: { type: String, required: true },
        status: {
            type: String,
            enum: AvailablePostStatuses,
            default: "draft",
        },
        tags: [String],
        publishedAt: Date,
    },
    { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
