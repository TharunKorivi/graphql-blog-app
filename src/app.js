import { ApolloServer } from "@apollo/server";

import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

import { expressMiddleware } from "@as-integrations/express5";

import { authMiddleware } from "./middlewares/auth.middleware.js";

import typeDefs from "./graphql/typeDefs/index.js";

import resolvers from "./graphql/resolvers/index.js";

import { createUserLoader } from "./loaders/user.loaders.js";
import { createCommentLoader } from "./loaders/comment.loaders.js";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(cookieParser());

app.use(authMiddleware);

const server = new ApolloServer({
    typeDefs,
    resolvers,

    formatError: (error) => {
        const KNOWN_CODES = [
            "UNAUTHENTICATED",

            "FORBIDDEN",

            "NOT_FOUND",

            "BAD_REQUEST",

            "DUPLICATE_FIELD",

            "INVALID_CREDENTIALS",

            "AT_LEAST_ONE_FIELD_REQUIRED",

            "INVALID_ID",
        ];
        const code = error.extensions?.code;

        if (!KNOWN_CODES.includes(code)) {
            console.error("Unexpected Error:", error);

            return {
                message: "Internal server error",

                extensions: {
                    code: "INTERNAL_SERVER_ERROR",
                },
            };
        }

        return {
            message: error.message,

            extensions: {
                code,
            },
        };
    },
});

await server.start();

app.use(
    "/graphql",

    expressMiddleware(server, {
        context: async ({ req, res }) => {
            return {
                req,
                res,
                userId: req.userId,
                loaders: {
                    userLoader: createUserLoader(),
                    commentLoader: createCommentLoader(),
                },
            };
        },
    })
);

export default app;
