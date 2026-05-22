import { throwUnauthenticated } from "../../errors/index.js";
import commentService from "../../services/commentService.js";

const commentResolver = {
    Mutation: {
        addComment: async (parent, { postId, body }, context) => {
            if (!context.userId) {
                throwUnauthenticated();
            }

            return await commentService.addComment(
                postId,
                context.userId,
                body
            );
        },

        updateComment: async (parent, { id, body }, context) => {
            if (!context.userId) {
                throwUnauthenticated();
            }
            return await commentService.updateComment(id, context.userId, body);
        },

        deleteComment: async (parent, { id }, context) => {
            if (!context.userId) {
                throwUnauthenticated();
            }

            return await commentService.deleteComment(id, context.userId);
        },
    },

    Comment: {
        id: (parent) => parent._id.toString(),
        createdAt: (parent) => parent.createdAt?.toISOString(),
        author: (parent, args, context) =>
            context.loaders.userLoader.load(parent.authorId.toString()),
    },
};

export default commentResolver;
