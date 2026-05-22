import gql from "graphql-tag";

export default gql`
    type User {
        id: ID!
        username: String!
        email: String!
        bio: String
        createdAt: String
    }

    type AuthPayload {
        user: User!
        token: String!
    }

    input CreateUserInput {
        username: String!
        email: String!
        password: String!
    }

    extend type Query {
        me: User
        user(id: ID!): User
    }

    extend type Mutation {
        signup(input: CreateUserInput!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
        updateProfile(username: String, bio: String): User!
        logout: Boolean!
        refreshToken: AuthPayload!
    }
`;
