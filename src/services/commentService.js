import { isValidObjectId } from "mongoose";
import {
    throwBadRequest,
    throwForbidden,
    throwInvalidID,
    throwNotFound,
    throwUnauthenticated,
} from "../errors/index.js";
import commentRepository from "../repositories/commentRepository.js";
import postRepository from "../repositories/postRepository.js";
import { PostStatusEnum } from "../utils/constants.js";

const commentService = {
    addComment: async (postId, authorId, body) => {
        if (!authorId) {
            throwUnauthenticated();
        }
        if (!isValidObjectId(postId)) {
            throwInvalidID("Post");
        }

        if (!body || !body.trim()) {
            throwBadRequest("Post body is required");
        }

        const post = await postRepository.findOne({
            status: PostStatusEnum.PUBLISHED,
            _id: postId,
        });

        if (!post) {
            throwNotFound("Post");
        }

        return commentRepository.create({
            postId: postId,
            authorId: authorId,
            body,
        });
    },

    updateComment: async (id, authorId, body) => {
        if (!authorId) {
            throwUnauthenticated();
        }
        if (!isValidObjectId(id)) {
            throwInvalidID("Comment");
        }

        if (!body || !body.trim()) {
            throwBadRequest("Post body is required");
        }

        const comment = await commentRepository.findById(id);

        if (!comment) {
            throwNotFound("Comment");
        }

        if (comment.authorId.toString() !== authorId.toString()) {
            throwForbidden("update this comment");
        }

        return commentRepository.update(id, { body });
    },

    deleteComment: async (id, authorId) => {
        if (!isValidObjectId(id)) {
            throwInvalidID("Comment");
        }

        const comment = await commentRepository.findById(id);

        if (!comment) {
            throwNotFound("Comment");
        }

        if (comment.authorId.toString() !== authorId.toString()) {
            throwForbidden("delete this comment");
        }

        await commentRepository.delete(id);

        return true;
    },
};

export default commentService;
