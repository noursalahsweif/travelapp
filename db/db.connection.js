import mongoose from "mongoose";

const mongoDbConnection = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/travel").then((res)=>{
console.log("db connected succ");
    }).catch((err)=>{
        console.log("db conection failed" , err);
    })

}
export default mongoDbConnection