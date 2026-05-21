import { ApolloServer } from "@apollo/server";

import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

import { expressMiddleware } from "@as-integrations/express5";

import { authMiddleware } from "./middlewares/auth.middleware.js";

import { typeDefs } from "./graphql/typeDefs/index.js";

import { resolvers } from "./graphql/resolvers/index.js";

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

const KNOWN_CODES = [
    "UNAUTHENTICATED",
    "FORBIDDEN",
    "NOT_FOUND",
    "BAD_USER_INPUT",
    "DUPLICATE_FIELD",
    "INVALID_CREDENTIALS",
];

const server = new ApolloServer({
    typeDefs,
    resolvers,

    formatError: (error) => {
        const code = error.extensions?.code;

        if (!KNOWN_CODES.includes(code)) {
            console.error("Unexpected error:", error.originalError);

            return {
                message: "Internal server error",

                extensions: {
                    code: "INTERNAL_SERVER_ERROR",
                },
            };
        }

        return error;
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

                user: req.user,
            };
        },
    })
);

export default app;
