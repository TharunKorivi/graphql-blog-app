import { Comment } from "../models/Comment.model.js";

const commentRepository = {
    findByPostId: (postId) => Comment.find({ postId }).sort({ createdAt: 1 }),
    findById: (id) => Comment.findById(id),
    findByPostIds: (ids) => Comment.find({ postId: { $in: ids } }),
    create: (data) => Comment.create(data),
    delete: (id) => Comment.findByIdAndDelete(id),
    update: (id, data) =>
        Comment.findByIdAndUpdate(id, data, { returnDocument: "after" }),
};

export default commentRepository;
