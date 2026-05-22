import gql from "graphql-tag";
import userTypeDefs from "./userTypeDefs.js";
import postTypeDefs from "./postTypeDefs.js";
import commentTypeDefs from "./commentTypeDefs.js";

const base = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

const typeDefs = [base, userTypeDefs, postTypeDefs, commentTypeDefs];

export default typeDefs;
