import { User } from "../models/user.model.js";

export const userRepository = {
    findByEmail: (email) => {
        return User.findOne({ email });
    },

    findByUsername: (username) => {
        return User.findOne({ username });
    },

    findById: (id) => {
        return User.findById(id);
    },

    create: (data) => {
        return User.create(data);
    },

    update: (id, data) => {
        return User.findByIdAndUpdate(id, data, {
            returnDocument: "after",
        });
    },
};
