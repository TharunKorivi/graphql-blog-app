import { GraphQLError } from "graphql";
import {
    throwDuplicateField,
    throwInvalidCredentials,
    throwNotFound,
    throwUnauthenticated,
} from "../errors/index.js";
import { userRepository } from "../repositories/userRepository.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../utils/jwt.js";

export const authService = {
    signup: async ({ username, email, password }) => {
        const existingUsername = await userRepository.findByUsername(username);

        if (existingUsername) {
            throwDuplicateField("username");
        }

        const existingEmail = await userRepository.findByEmail(email);

        if (existingEmail) {
            throwDuplicateField("email");
        }

        const user = await userRepository.create({
            username,
            email,
            password,
        });

        const accessToken = generateAccessToken(user._id);

        const refreshToken = generateRefreshToken(user._id);

        await userRepository.update(user._id, { refreshToken });

        return {
            accessToken,
            refreshToken,
            user,
        };
    },

    login: async ({ email, password }) => {
        const user = await userRepository.findByEmail(email);

        const valid = user && (await user.isPasswordCorrect(password));

        if (!valid) {
            throwInvalidCredentials();
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        await userRepository.update(user._id, { refreshToken });

        return {
            accessToken,
            refreshToken,
            user,
        };
    },

    updateUser: async (userId, data) => {
        if (!userId) throwUnauthenticated();
        data.username = data.username?.trim();
        data.bio = data.bio?.trim();
        if (!data.username && !data.bio)
            throw new GraphQLError(`Username or bio required`, {
                extensions: {
                    code: "AT_LEAST_ONE_FIELD_REQUIRED",
                    http: {
                        status: 400,
                    },
                },
            });
        if (data.username) {
            const taken = await userRepository.findByUsername(data.username);
            if (taken && taken._id.toString() !== userId)
                throw new DuplicateFieldError("username");
        }
        return userRepository.update(userId, data);
    },

    refreshToken: async (incomingRefreshToken) => {
        if (!incomingRefreshToken) {
            throwUnauthenticated();
        }

        let payload;

        try {
            payload = verifyRefreshToken(incomingRefreshToken);
        } catch (error) {
            console.error("Refresh token verification failed");
            throwUnauthenticated();
        }

        const user = await userRepository.findById(payload.userId);

        if (!user || user.refreshToken !== incomingRefreshToken) {
            console.error("Refresh token verification failed");
            throwUnauthenticated();
        }

        const refreshToken = generateRefreshToken(user._id);
        const accessToken = generateAccessToken(user._id);

        await userRepository.update(user._id, { refreshToken });

        return {
            accessToken,
            refreshToken,
            user,
        };
    },

    getMe: async (userId) => {
        if (!userId) {
            throwUnauthenticated();
        }
        const user = await userRepository.findById(userId);

        if (!user) {
            throwNotFound("User");
        }

        return user;
    },

    invalidateSession: async (userId) => {
        await userRepository.update(userId, { refreshToken: null });
    },
};
