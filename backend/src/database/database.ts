import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const database:any=process.env.MONGO_ATLAS_URI;

export const connection=async()=>{
    try {
        await mongoose.connect(database);
        ("MongoDB Connected Successfully..!!😍😎");
    } catch (error:any) {
        ("Error While Connecting..!!"+ error.message);
    }
}