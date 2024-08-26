import express from 'express';
import { addChatMessage, getOrCreateChatRoom} from "./chat.controller.js";
import authenticateToken from "../../config/jwt.middleware.js";


export const chatRouter = express.Router();
chatRouter.use(authenticateToken);


chatRouter.post('/', getOrCreateChatRoom);
chatRouter.post('/chats', addChatMessage);