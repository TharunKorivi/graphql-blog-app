import { isValidObjectId } from "mongoose";
import {
    throwBadRequest,
    throwInvalidID,
    throwUnauthenticated,
} from "../../errors/index.js";
import postService from "../../services/postService.js";
import { userRepository } from "../../repositories/userRepository.js";
import commentRepository from "../../repositories/commentRepository.js";

const postResolver = {
    Query: {
        posts: async () => {
            return await postService.getAllPosts();
        },

        post: async (parent, { id }, context) => {
            return await postService.getPostById(id, context.userId);
        },
    },

    Mutation: {
        createPost: async (parent, { input }, context) => {
            if (!context.userId) {
                throwUnauthenticated();
            }
            return await postService.createPost(context.userId, input);
        },

        publishPost: async (parent, { id }, context) => {
            if (!context.userId) {
                throwUnauthenticated();
            }

            return await postService.publishPost(id, context.userId);
        },

        updatePost: async (parent, { id, update }, context) => {
            if (!context.userId) {
                throwUnauthenticated();
            }
            return await postService.updatePost(id, context.userId, update);
        },

        deletePost: async (parent, { id }, context) => {
            if (!context.userId) {
                throwUnauthenticated();
            }
            return await postService.deletePost(id, context.userId);
        },
    },

    Post: {
        id: (parent) => parent._id.toString(),

        publishedAt: (parent) => parent.publishedAt?.toISOString(),

        createdAt: (parent) => parent.createdAt?.toISOString(),

        author: (parent, args, context) =>
            context.loaders.userLoader.load(parent.authorId.toString()),

        comments: (parent, args, context) =>
            context.loaders.commentLoader.load(parent._id.toString()),
    },
};

export default postResolver;
