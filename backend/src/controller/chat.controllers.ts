import { NextFunction, Request, Response } from "express";
import User from "../model/user.model";
// import { configureOpenai } from "../config/openai-config";
import OpenAI from "openai";
import dotenv from "dotenv";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
dotenv.config();

const api = process.env.OPENAI_API;

export const generateChatComplation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({
        message: "user Not Register Or Token Is Malfunctioned..!!",
      });
    }

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    }));


    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    const config = new OpenAI({ apiKey: api });
    const chatRes = await config.chat.completions.create({
      messages: chats as ChatCompletionMessageParam[],
      model: "gpt-3.5-turbo",
    });

    const completionMessage = chatRes.choices[0]?.message.content;

    user.chats.push({ content: completionMessage, role: "assistant" });

    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
     console.error("Error generating chat completion:", error);
    return res.status(500).json({ message: "Something Went Wrong..!!" });
  }
};



export const sendChatToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Exists Or Token Is Malfunctioned..!!" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permission Did Not Match..!!" });
    }
    return res
      .status(201)
      .json({
        message: "Chat sent succesfully..!!",
        chats:user.chats
      });
  } catch (error: any) {
    (error.message);
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};
