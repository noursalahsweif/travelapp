import { Router } from "express";
import { addToCart, adminLogin, authSignup, forgotPass, login } from "../contrroler/user.controller.js";
import { jwtCheck } from "../../utils/jwtGeneration.js";



const userRouter = Router()

userRouter.post('/signup',authSignup)
userRouter.post('/adminlogin',adminLogin)
userRouter.post('/login',login)
userRouter.post('/forgotpass',forgotPass)
userRouter.post('/addwishlist/:id', jwtCheck,addToCart)

export default userRouter