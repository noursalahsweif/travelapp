
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
        type:String,
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
      },
      wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trip' }],
      tokens:[String]  
})

 const userModle = mongoose.model("User" , userScheama)
 export default userModle