import OpenAI from 'openai';
import dotenv from "dotenv";

const api = process.env.API;
export const configureOpenai=()=>{
    const config = new OpenAI({ apiKey: api });
    return config;
}