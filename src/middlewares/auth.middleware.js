import { verifyAccessToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            (req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : null);

        if (!token) {
            req.userId = null;

            return next();
        }

        const payload = verifyAccessToken(token);

        req.userId = payload.userId;
    } catch (error) {
        console.error(error.message);
        req.userId = null;
    }

    next();
};
