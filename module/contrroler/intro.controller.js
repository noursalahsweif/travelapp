import { sendEmail } from "../../helper/nodemailer.js";
import introModel from "../modles/intro.model.js";
import tripModel from "../modles/trips.model.js";
import userModle from "../modles/user.modle.js";


export const addIntro = async (req , res) =>{
    try {
        const {title , description} = req.body
    const photos = req.files?.map(file => file.path);
      
      const data = {title,photos,description}
    const intro = await introModel.create(data);
      res.status(200).json(intro);
    } catch (error) {
        res.status(500).json({message :"falid to add intro"});
    }
}

export const bookNow = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = await userModle.findOne({ email: userEmail });
    const userName = user?.name;

    const id = req.params.id;
    const trip = await tripModel.findById(id);
    const finalData = {
      name: trip.name,
      location: trip.location,
      price: trip.price,
    };

    console.log("Email to:", userEmail);
    console.log("Trip:", finalData);

    await sendEmail(userName, finalData, userEmail);

    res.status(200).json({ message: "Please check your email for more information" });
  } catch (error) {
    console.error("bookNow error:", error);
    res.status(500).json({ message: "Failed to book trip" });
  }
};
