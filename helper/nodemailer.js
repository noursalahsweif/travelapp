import nodemailer from "nodemailer"
import tripModel from './../module/modles/trips.model.js';
import { jwtCheck } from "../utils/jwtGeneration.js";



export const sendEmail = async (name, data, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'noursalahsweif4@gmail.com',
        pass: process.env.EMALI_PASS_NODEMAILER, 
      },
    });

    const mailOptions = {
      from: '"Your Travel App" <noursalahsweif4@gmail.com>',
      to: email,
      subject: "Booking Pending Confirmation",
      text: `Hey ${name} 👋,

Thanks for booking with us! 🧳✨

You're all set for the amazing "${data.name}" experience in ${data.location}.  
💰 Total Price: $${data.price}

Your booking is currently pending confirmation. We’ll be in touch shortly to finalize the payment and lock in your spot.

Got questions or need help? Our support team is just a message away.

Safe travels,  
— Your Travel App Team 🌍`

    };
    
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

