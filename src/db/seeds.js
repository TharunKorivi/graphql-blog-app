import mongoose from "mongoose";
import dotenv from "dotenv";

import { connectDB } from "./config.js";

import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import { PostStatusEnum } from "../utils/constants.js";

import bcrypt from "bcryptjs";

dotenv.config();

const seed = async () => {
    try {
        await connectDB();

        console.log("Connected to DB");

        const passwordHash = "password";

        // Clear old data
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});

        console.log("Old data cleared");

        // Create users
        const users = await User.create([
            {
                username: "tharun",
                email: "tharun@test.com",
                password: passwordHash,
                bio: "Backend developer",
            },
            {
                username: "alex",
                email: "alex@test.com",
                password: passwordHash,
                bio: "GraphQL enthusiast",
            },
            {
                username: "john",
                email: "john@test.com",
                password: passwordHash,
                bio: "MERN stack dev",
            },
        ]);

        console.log("Users seeded");

        // Create posts
        const posts = await Post.create([
            {
                title: "GraphQL Basics",
                body: "Introduction to GraphQL",
                tags: ["graphql", "backend"],
                status: PostStatusEnum.PUBLISHED,
                authorId: users[0]._id,
                publishedAt: new Date(),
            },

            {
                title: "Understanding DataLoader",
                body: "Fixing N+1 issue in GraphQL",
                tags: ["graphql", "dataloader"],
                status: PostStatusEnum.PUBLISHED,
                authorId: users[1]._id,
                publishedAt: new Date(),
            },

            {
                title: "MongoDB Relationships",
                body: "Working with references",
                tags: ["mongodb", "mongoose"],
                status: PostStatusEnum.DRAFT,
                authorId: users[2]._id,
            },
        ]);

        console.log("Posts seeded");

        // Create comments
        await Comment.create([
            {
                body: "Amazing article!",
                authorId: users[1]._id,
                postId: posts[0]._id,
            },

            {
                body: "Very helpful explanation",
                authorId: users[2]._id,
                postId: posts[0]._id,
            },

            {
                body: "DataLoader finally makes sense",
                authorId: users[0]._id,
                postId: posts[1]._id,
            },

            {
                body: "Waiting for part 2",
                authorId: users[1]._id,
                postId: posts[2]._id,
            },
        ]);

        console.log("Comments seeded");

        console.log("Database seeded successfully");

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);

        process.exit(1);
    }
};

seed();
