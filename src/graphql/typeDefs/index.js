import gql from "graphql-tag";
import userTypeDefs from "./userTypeDefs.js";

const base = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

const helloTypeDef = gql`
    extend type Query {
        hello: String
    }
`;

export const typeDefs = [base, userTypeDefs, helloTypeDef];
