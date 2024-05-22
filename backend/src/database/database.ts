import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const database:any=process.env.MONGODB_CLOUD_URI || process.env.MONGO_ATLAS_URI;

export const connection=async()=>{
    try {
        await mongoose.connect(database);
        console.log("MongoDB Connected Successfully..!!😍😎");
    } catch (error:any) {
        console.log("Error While Connecting..!!"+ error.message);
    }
}