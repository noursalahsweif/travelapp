import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required:true
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  price:{
    type:Number,
    required:true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  type:{
      type:String,
      required:true
    }
  
  

});

const hotelModel = mongoose.model("Hotel", HotelSchema)
export default hotelModel