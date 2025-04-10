
import userModle from './../module/modles/user.modle.js';

export const userCollection = {
  userHelper: async (values) => {
    try {
      const existData = await userModle.findOne({ phone: values.phone });
      console.log(values.name);

      if (!existData) {
        await userModle.create({
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password, // Ensure `encrypt` is the hashed password
          
        });
        
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
    console.log('it did');
    
    const authLogin = await userModle.findOne({ email });
    console.log('it didnot');
    return authLogin;
    
  } catch (error) {
    console.error(error);
  }
};


