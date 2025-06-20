import mongoose from "mongoose";
const introSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required:true
  },
  
  photos: {
    type: [String],
  },
  
});

const introModel = mongoose.model("intro", introSchema)
export default introModel