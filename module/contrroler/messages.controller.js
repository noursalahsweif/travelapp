// import { findDec } from "../../db/method.js";
import messageModel from "../modles/messages.model.js"
import userModle from "../modles/user.modle.js"

export const sendMessage = async (req ,res )=>{
    console.log("hello");
    const content = req.body
    console.log(content);
    
    

    // const user = await userModle.findById(sendTo)
    // if(!user){
    //     return res.status(404).json({message:"user not fond"})
    // }

    
    
    const createMessage = await messageModel.create({content})
    if(!createMessage){
        return res.status(400).json({message:"message send failed"})
    }
    res.status(201).json({message:"message send succ" , createMessage})
}

export const deleteMessage = async (req,res)=>{
    const {logedInId , msgId} = req.query

    const isMessageEx = await messageModel.findOneAndDelete({_id:msgId , sendTo: logedInId})
    if(!isMessageEx){return res.status(400).json({message:"cannot delete this msg"})}
    return res.status(200).json({message:"msg deleted succ"})
}