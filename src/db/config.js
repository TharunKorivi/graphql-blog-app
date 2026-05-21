import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const DB_URI = process.env.MONGO_URI;
        const { connection } = await mongoose.connect(DB_URI);

        console.log(
            `MongoDb is running on mongodb+srv:${connection.host}:${connection.port}/${connection.name}`
        );
    } catch (error) {
        console.log("Error in connecting DB : ", error.message);
        process.exit(1);
    }
};
