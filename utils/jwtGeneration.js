import  sign from 'jsonwebtoken';
import dotenv from 'dotenv'
import jwt  from 'jsonwebtoken';
dotenv.config();


const SECRET_KEY = process.env.JWT_SECRET 

export const createToken = (userId) => {
    // console.log(userId);
    
    return jwt.sign({ id: userId }, SECRET_KEY, {
        expiresIn: "7d", // Token expires in 7 days
    });
};


