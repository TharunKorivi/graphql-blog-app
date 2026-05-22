import { Post } from "../models/Post.model.js";

const postRepository = {
    findById: (id) => Post.findById(id),
    findOne: (filter) => Post.findOne(filter),
    findAll: (filter = {}) => Post.find(filter).sort({ createdAt: -1 }),
    create: (data) => Post.create(data),
    update: (id, data) =>
        Post.findByIdAndUpdate(id, data, { returnDocument: "after" }),
    delete: (id) => Post.findByIdAndDelete(id),
};

export default postRepository;
