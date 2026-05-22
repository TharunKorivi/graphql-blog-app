import gql from "graphql-tag";

const postTypeDefs = gql`
    type Post {
        id: ID!
        title: String!
        body: String!
        status: String!
        tags: [String]
        author: User!
        publishedAt: String
        createdAt: String
        comments: [Comment!]!
    }

    input UpdatePostInput {
        title: String
        body: String
        tags: [String]
    }

    input CreatePostInput {
        title: String!
        body: String!
        tags: [String]
    }

    extend type Query {
        posts: [Post!]!
        post(id: ID!): Post!
    }

    extend type Mutation {
        createPost(input: CreatePostInput!): Post!
        publishPost(id: ID!): Post!
        deletePost(id: ID!): Boolean!
        updatePost(id: ID!, update: UpdatePostInput!): Post!
    }
`;

export default postTypeDefs;
