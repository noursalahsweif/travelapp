import  sign from 'jsonwebtoken';
import dotenv from 'dotenv'
import jwt  from 'jsonwebtoken';
import userModle from '../module/modles/user.modle.js';
dotenv.config();


const SECRET_KEY = process.env.JWT_SECRET 

export const createToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
  return token;
};


export const jwtCheck = async (req, res, next)=>{
  const authHeader = req.header('Authorization');
  
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    // Find user AND check if token exists in user's token list
    const user = await userModle.findOne({ _id: decoded.id, tokens: token });
    
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token or user not found.' });
    }

    req.user = { id: user._id, email: user.email }; // You can add more info
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' , err });
  }
}

