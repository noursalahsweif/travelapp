
import userModle from './../module/modles/user.modle.js';

export const userCollection = {
  userHelper: async (values) => {
    try {
      const existData = await userModle.findOne({ email:values.email });
      // console.log(values.name);
      console.log(existData);
      

      if (!existData) {
        console.log(values.name);
        
        await userModle.create({
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password, // Ensure `encrypt` is the hashed password
          
        });
        console.log(values.phone);
        
        ;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error.message);
    }
  },
};

export const authLoginHelper = async (email) => {
  try {
    
    
    const authLogin = await userModle.findOne({ email });
    
    return authLogin;
    
  } catch (error) {
    console.error(error);
  }
};


