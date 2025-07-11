import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI: string =
  process.env.MONGO_URI || "mongodb://localhost:27017/todolist";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
