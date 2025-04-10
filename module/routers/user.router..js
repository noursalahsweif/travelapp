import { Router } from "express";
import { authSignup, login } from "../contrroler/user.controller.js";



const userRouter = Router()

userRouter.post('/signup',authSignup)
userRouter.post('/login',login)

export default userRouter