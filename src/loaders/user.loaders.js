import DataLoader from "dataloader";
import { userRepository } from "../repositories/userRepository.js";

export const createUserLoader = () => {
    return new DataLoader(async (userIds) => {
        const users = await userRepository.findByIds(userIds);

        const usersMap = new Map();

        users.forEach((user) => {
            usersMap.set(user._id.toString(), user);
        });

        return userIds.map((id) => usersMap.get(id.toString()) || {});
    });
};
