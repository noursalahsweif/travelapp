import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/userModel.js";

export const JWT_Check = asyncHandler(async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (typeof decoded !== "string") {
        const user = await UserModel.findById(decoded.id);
        
        if (!user) {
          return res.status(401).json({ message: "Invalid token" });
        }
        
        if (user.action === true) {
          req.Token = user._id;
          next();
        } else {
          return res.status(401).json({ message: "User is Blocked", action: true });
        }
      }
    } else {
      return res.status(401).json({ message: "No authorization" });
    }
  } catch (error) {
    next(error);
  }
});
