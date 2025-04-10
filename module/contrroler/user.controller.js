import bcrypt from "bcrypt"
import { authLoginHelper, userCollection } from "../../helper/auth.js";
import { signupSchema } from "../../validation/auth.js";
import { createToken } from "../../utils/jwtGeneration.js";






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
                const { name, email, phone, password } = validationData;
                const encryptedPassword = await hashPassword(password);
                console.log(encryptedPassword);
                
                const values = {
                    name,
                    email,
                    phone,
                    password: encryptedPassword, // Store encrypted password
                };

                const userData = await userCollection.userHelper(values);

                if (!userData) {
                    return res.status(200).json({ action: true });
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
        

        if (userData) {
            
            const encryptPassword = userData.password;
            
            const matchPassword = await bcrypt.compare(password, encryptPassword);
            

            if (userData.action === true) {
                if (matchPassword) {
                    console.log("its on creating token");
                    
                    const token = createToken(userData._id);
                    console.log(token);
                    
                    return res.status(200).json({
                        success: true,
                        token,
                        userData
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


