import postRepository from "../repositories/postRepository.js";
import { PostStatusEnum } from "../utils/constants.js";
import {
    throwAtleastOneFieldRequired,
    throwBadRequest,
    throwForbidden,
    throwInvalidID,
    throwNotFound,
    throwUnauthenticated,
} from "../errors/index.js";
import { isValidObjectId } from "mongoose";

const postService = {
    getAllPosts: () =>
        postRepository.findAll({ status: PostStatusEnum.PUBLISHED }),

    getPostById: async (id, userId) => {
        if (!id) throwBadRequest("Post ID is required");
        if (!isValidObjectId(id)) throwInvalidID("Post");
        const post = await postRepository.findById(id);
        if (!post) {
            throwNotFound("Post");
        }

        if (
            post.status === PostStatusEnum.DRAFT &&
            (!userId || post.authorId.toString() !== userId.toString())
        ) {
            throwNotFound("Post");
        }
        return post;
    },

    createPost: (authorId, input) => {
        if (!authorId) throwUnauthenticated();
        if (
            !input.title ||
            !input.title.trim() ||
            !input.body ||
            !input.body.trim()
        ) {
            throwBadRequest("Title and body are required");
        }
        return postRepository.create({ ...input, authorId });
    },

    updatePost: async (id, authorId, input) => {
        if (!authorId) throwUnauthenticated();
        if (!isValidObjectId(id)) throwInvalidID("Post");
        if (!input.title && !input.body && !input.tags) {
            throwAtleastOneFieldRequired("Title or body is required");
        }
        const post = await postRepository.findById(id);

        if (!post) throwNotFound("Post");

        if (post.authorId.toString() !== authorId)
            throwForbidden("update this post");

        return postRepository.update(id, input);
    },

    publishPost: async (id, userId) => {
        if (!userId) {
            throw new throwUnauthenticated();
        }

        if (!isValidObjectId(id)) {
            throwInvalidID();
        }

        const post = await postRepository.findById(id);
        if (!post) {
            throwNotFound("Post");
        }

        if (post.authorId.toString() !== userId.toString()) {
            throwForbidden("pusblish this post");
        }
        return postRepository.update(id, {
            status: PostStatusEnum.PUBLISHED,
            publishedAt: new Date(),
        });
    },

    deletePost: async (id, userId) => {
        if (!userId) {
            throwUnauthenticated();
        }

        if (!isValidObjectId(id)) {
            throwInvalidID("Post");
        }

        const post = await postRepository.findById(id);

        if (!post) {
            throwNotFound("Post");
        }

        if (post.authorId.toString() !== userId) {
            throwForbidden("delete this post");
        }

        await postRepository.delete(id);

        return true;
    },
};

export default postService;
