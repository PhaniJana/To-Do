import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL as string,{
            dbName:'ToDoApp'
        })
        console.log("DataBase Connected");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}
