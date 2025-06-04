import { Router } from "express";
import { authSignup, forgotPass, login } from "../contrroler/user.controller.js";



const userRouter = Router()

userRouter.post('/signup',authSignup)
userRouter.post('/login',login)
userRouter.post('/forgotpass',forgotPass)

export default userRouter