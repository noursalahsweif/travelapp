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
    const { name, email, password, cpassword, phone } = req.body;

    // Validate input with await
    const validationData = await signupSchema.validate(
      { name, email, password, cpassword, phone },
      { abortEarly: false } // Show all validation errors
    );

    const { name: validatedName, email: validatedEmail, phone: validatedPhone, password: validatedPassword } = validationData;

    const existData = await userModle.findOne({ email: validatedEmail });
    if (existData) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const encryptedPassword = await hashPassword(validatedPassword);
    const userData = await userModle.create({
      name: validatedName,
      email: validatedEmail,
      password: encryptedPassword,
      phone: validatedPhone,
    });

    if (!userData) {
      return res.status(500).json({ message: "User creation failed" });
    }

    return res.status(200).json({ success: true, userData });

  } catch (error) {
    if (error.name === "Validation Error") {
      console.error("Validation errors:", error.errors);
      return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }

    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const adminLogin = async (req,res) =>{
    try {
    const userId = req.params.id;

    const user = await userModle.findByIdAndUpdate(
      userId,
      { isAdmin: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "User has been granted admin rights",
      user
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}





export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await authLoginHelper(email);
        if (userData) {
            
            const encryptPassword = userData.password;
            // console.log(encryptPassword);
            console.log(password);
            console.log(encryptPassword);
            
            
            const matchPassword = await bcrypt.compare(password, encryptPassword);
            if(!matchPassword) return res.status(500).json({ message: "incorrect password" });
            
            
            
            if (userData.active === true) {
                if (matchPassword) {
                    console.log("its on creating token");
                    
                    const token = createToken(userData._id);
                    
                    userData.tokens.push( token );
                    await userData.save();
                    const name1 = userData.name
                    const isAdmin = userData.isAdmin
                    return res.status(200).json({
                        success: true,
                        token,
                        name:name1,
                        isAdmin:isAdmin
                    });
                } else {
                    return res.status(500).json({ success: false });
                }
            } else {
                return res.status(501).json({ action: true });
            }
        } else {
            return res.status(500).json({ message:"invalid email"  });
        }
    } catch (error) {
        console.error(error); // Log full error
        return res.status(500).json({ message: error.message});

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
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log(user);
    
    user.password = hashedPassword
    await user.save()

    

    res.status(200).json({ message: 'Password has been updated' });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message });
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
        console.error(error)
        return res.status(500).json({ message: error.message });
    }
}