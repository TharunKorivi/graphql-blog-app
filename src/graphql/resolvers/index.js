import { userResolver } from "./userResolver.js";
import postResolver from "./postResolver.js";
import commentResolver from "./commentResolver.js";

const resolvers = [userResolver, postResolver, commentResolver];

export default resolvers;
