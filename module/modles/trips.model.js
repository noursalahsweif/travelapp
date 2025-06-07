import mongoose from "mongoose";

// const { Schema, model, models } = mongoose;

const TripSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    photos: {
    type: [String],
    },
    price:{
    type:Number,
    required:true
    },
    location:{
    type:String
    },
    date:{
      type:Date
    },
    city:{
      type:String,
      required:true
    },
    rating:{
      type:String,
      min: 0,
      max: 5,
    }

  },
  { timestamps: true }
);
const tripModel = mongoose.model("trip" , TripSchema)
export default tripModel
