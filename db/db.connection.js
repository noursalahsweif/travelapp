import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();

// const mongoDbConnection = async () => {
//     await mongoose.connect("mongodb://127.0.0.1:27017/travel").then((res)=>{
// console.log("db connected succ");
//     }).catch((err)=>{
//         console.log("db conection failed" , err);
//     })

// }
const mongoDbConnection = async ()=>{
   await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
}
export default mongoDbConnection