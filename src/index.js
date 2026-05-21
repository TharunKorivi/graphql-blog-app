import { config } from "dotenv";
config();
import { connectDB } from "./db/config.js";
import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
