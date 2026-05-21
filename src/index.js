import { config } from "dotenv";
config();
import { connectDB } from "./db/config.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
