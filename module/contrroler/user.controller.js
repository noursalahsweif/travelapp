import bcrypt from "bcrypt"
import { authLoginHelper, userCollection } from "../../helper/auth.js";
import { signupSchema } from "../../validation/auth.js";
import { createToken } from "../../utils/jwtGeneration.js";
import userModle from "../modles/user.modle.js";






const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (error) {
        console.log(error);
    }
};

export const authSignup = async (req, res) => {
    try {
        const {name , email , password , cpassword , phone} = req.body; // No type annotation needed in JS
        

        signupSchema.validate({name , email , password , cpassword , phone})
            .then(async (validationData) => {
                // console.log(validationData);
                
                const { name, email, phone, password ,cpassword} = validationData;
                const encryptedPassword = await hashPassword(password);
                
                
                const values = {
                    name,
                    email,
                    phone,
                    password: encryptedPassword,
                     // Store encrypted password
                };
                console.log(password);
                const existData = await userModle.findOne({ email:values.email });
                      // console.log(values.name);
                      console.log(existData);
                

                const userData = await userModle.create({name:values.name , email:values.email , password:values.password , phone:values.phone})

                if (!userData) {
                    return res.status(200).json({ message: "falied" });
                } else {
                    
                    return res.status(200).json({ success: true, userData });
                }
            })
            .catch((validationError) => {
                console.error(validationError);
                return res.status(400).json({ error: "Validation failed" });
            });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await authLoginHelper(email);
        // console.log(userData);
        // console.log(userData.active);
        
        

        if (userData) {
            
            const encryptPassword = userData.password;
            // console.log(encryptPassword);
            
            const matchPassword = await bcrypt.compare(password, encryptPassword);
            if(!matchPassword) return res.status(500).json({ message: "incorrect password" });
            
            
            
            if (userData.active === true) {
                if (matchPassword) {
                    console.log("its on creating token");
                    
                    const token = createToken(userData._id);
                    
                    userData.tokens.push( token );
                    await userData.save();
                    const name1 = userData.name
                    return res.status(200).json({
                        success: true,
                        token,
                        name:name1
                    });
                } else {
                    return res.status(200).json({ success: false });
                }
            } else {
                return res.status(200).json({ action: true });
            }
        } else {
            return res.status(200).json({ action: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const forgotPass = async (req,res) =>{
    try {
        const {email, newPassword} = req.body
        
        const hashedPassword = await hashPassword(newPassword);
        
        
        // const user = await userModle.findOne({ email });
    const user = await userModle.findOne(
      { email:email }
    );
    console.log(user);
    
    user.password = hashedPassword
    await user.save()

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'Password has been updated' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const addToCart = async (req , res)=>{
    try {
       const itemId = req.params.id;
    const user = await userModle.findById(req.user.id);

    // Optional: Prevent duplicates
    if (!user.wishlist.includes(itemId)) {
      user.wishlist.push(itemId); // ✅ This is where you use push
      await user.save();
      return res.json({ message: 'item added to wishlist', wishlist: user.wishlist });
    } else {
      return res.status(400).json({ message: 'item already in wishlist' });
    }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}