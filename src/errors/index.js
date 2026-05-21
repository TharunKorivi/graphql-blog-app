import { GraphQLError } from "graphql";

export const throwUnauthenticated = () => {
    throw new GraphQLError("You must be logged in", {
        extensions: {
            code: "UNAUTHENTICATED",
            http: {
                status: 401,
            },
        },
    });
};

export const throwForbidden = (action = "perform this action") => {
    throw new GraphQLError(`Not allowed to ${action}`, {
        extensions: {
            code: "FORBIDDEN",
            http: {
                status: 403,
            },
        },
    });
};

export const throwNotFound = (resource = "Resource") => {
    throw new GraphQLError(`${resource} not found`, {
        extensions: {
            code: "NOT_FOUND",
            http: {
                status: 404,
            },
        },
    });
};

export const throwBadRequest = (message = "Bad request") => {
    throw new GraphQLError(message, {
        extensions: {
            code: "BAD_REQUEST",
            http: {
                status: 400,
            },
        },
    });
};

export const throwDuplicateField = (field) => {
    throw new GraphQLError(`${field} is already in use`, {
        extensions: {
            code: "DUPLICATE_FIELD",
            http: {
                status: 409,
            },
            invalidArgs: {
                [field]: "already taken",
            },
        },
    });
};

export const throwInvalidCredentials = () => {
    throw new GraphQLError("Invalid email or password", {
        extensions: {
            code: "INVALID_CREDENTIALS",
            http: {
                status: 401,
            },
        },
    });
};

export const throwInternalServerError = () => {
    throw new GraphQLError("Internal server error", {
        extensions: {
            code: "INTERNAL_SERVER_ERROR",
            http: {
                status: 500,
            },
        },
    });
};
