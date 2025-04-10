
import mongoose from "mongoose";



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
        unique:true
      },
      password: {
        type: String,
      },
      profile:{
        type: String
      },
      first:{
        type:String,
      },
      last:{
        type:String
      },
      address:{
        type:String
      },
      idCard:{
        number:String,
        image:String
      },
      action:{
        type:Boolean,
        default:true
      },
      isAdmin: {
        type: Boolean,
        default: false,
      }
})

 const userModle = mongoose.model("User" , userScheama)
 export default userModle