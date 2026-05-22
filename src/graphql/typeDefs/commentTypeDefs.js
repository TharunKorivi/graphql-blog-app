import gql from "graphql-tag";

const commentTypeDefs = gql`
    type Comment {
        id: ID!
        body: String!
        author: User!
        createdAt: String
    }

    extend type Mutation {
        addComment(postId: ID!, body: String!): Comment!
        updateComment(id: ID!, body: String!): Comment!
        deleteComment(id: ID!): Boolean!
    }
`;

export default commentTypeDefs;
