import { throwUnauthenticated } from "../../errors/index.js";
import { userRepository } from "../../repositories/userRepository.js";
import { authService } from "../../services/authService.js";
import { verifyRefreshToken } from "../../utils/jwt.js";

const httpOptions = {
    httpOnly: true,
    secure: true,
};

export const userResolver = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.userId) throwUnauthenticated();
            return await authService.getMe(context.userId.toString());
        },

        user: (parent, { id }) => {
            return authService.getMe(id);
        },
    },

    Mutation: {
        signup: async (parent, { input }, context) => {
            const { refreshToken, accessToken, user } =
                await authService.signup(input);

            context.res.cookie("refreshToken", refreshToken, httpOptions);

            return {
                user,
                token: accessToken,
            };
        },

        login: async (parent, data, context) => {
            const { accessToken, refreshToken, user } =
                await authService.login(data);

            context.res.cookie("refreshToken", refreshToken, httpOptions);

            return {
                user,
                token: accessToken,
            };
        },

        logout: async (parent, args, context) => {
            if (context.userId) {
                throwUnauthenticated();
            }

            await authService.invalidateSession(context.userId);

            context.res.clearCookie("refreshToken", httpOptions);

            return true;
        },

        refreshToken: async (parent, args, context) => {
            const refreshToken = context.req.cookies?.refreshToken;

            if (!refreshToken) {
                throwUnauthenticated();
            }

            const {
                accessToken,
                refreshToken: newRefreshToken,
                user,
            } = await authService.refreshToken(refreshToken);

            context.res.cookie("refreshToken", newRefreshToken, httpOptions);

            return {
                token: accessToken,
                user,
            };
        },

        updateProfile: async (parent, args, context) => {
            if (!context.userId) {
                throwUnauthenticated();
            }

            return await authService.updateUser(context.userId, args);
        },
    },

    User: {
        id: (parent) => parent._id.toString(),
        createdAt: (parent) => {
            return parent.createdAt?.toISOString();
        },
    },
};
