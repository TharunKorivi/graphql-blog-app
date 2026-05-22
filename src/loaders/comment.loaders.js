import commentRepository from "../repositories/commentRepository.js";
import DataLoader from "dataloader";

export const createCommentLoader = () => {
    return new DataLoader(async (postIds) => {
        const comments = await commentRepository.findByPostIds(postIds);

        const postCommenstMap = new Map();

        postIds.forEach((postId) => {
            postCommenstMap.set(postId.toString(), []);
        });

        comments.forEach((comment) => {
            const postId = comment.postId.toString();

            postCommenstMap.get(postId)?.push(comment);
        });

        return postIds.map(
            (postId) => postCommenstMap.get(postId.toString()) || []
        );
    });
};
