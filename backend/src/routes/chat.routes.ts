import { Router } from "express";
import { verifyToken } from "../utils/genarettoken";
import { chatcomplationValidator, validate } from "../middleware/validator";
import { generateChatComplation, sendChatToUser } from "../controller/chat.controllers";

const chatRouter=Router();

chatRouter.post(
  "/new",
  validate(chatcomplationValidator),
  verifyToken,
  generateChatComplation
);

chatRouter.get('/allchats',verifyToken,sendChatToUser);

export default chatRouter;