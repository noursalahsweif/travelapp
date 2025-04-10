import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const TripSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hotelId: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    // flightId: { type: Schema.Types.ObjectId, ref: "Flight", required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);
const tripModel = mongoose.model("trip" , TripSchema)
export default tripModel
