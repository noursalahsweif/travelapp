
import mongoose from "mongoose";
import { boolean } from "yup";



const userScheama = new mongoose.Schema({


    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
       
      },
      phone:{
        type:Number,
        required:true,
        unique:true
      },
      password: {
        type: String,
        required:true,
      },
      
      profile:{
        type: String
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      active:{
        type:Boolean,
        default:true
      }
})

 const userModle = mongoose.model("User" , userScheama)
 export default userModle