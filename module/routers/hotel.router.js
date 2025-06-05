import { Router } from "express";
import { createHotel, getHotel, getHotels} from "../contrroler/hotel.controller.js";
import upload from "../../helper/uploadcloud.js";




const hotelRouter = Router()

hotelRouter.post('/', upload.array('photos', 5), createHotel); 
hotelRouter.get("/gethotel/:id",getHotel);
hotelRouter.get("/gethotels",getHotels);


export default hotelRouter