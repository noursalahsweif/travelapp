import { Router } from "express";
import { deleteMessage, sendMessage } from "../contrroler/messages.controller.js";

const messageRouter = Router()

messageRouter.post("/sendTo" , sendMessage)
messageRouter.delete("/deleteMsg" , deleteMessage)

export default messageRouter