import { Router } from "express";
import { createHotel, getHotel, getHotels, getHotelsByCity } from "../contrroler/hotel.controller.js";




const hotelRouter = Router()

hotelRouter.post('/addhotel',createHotel);
hotelRouter.get("/gethotel/:id",getHotel);
hotelRouter.get("/gethotels",getHotels);
hotelRouter.get("/gethotelsbycity",getHotelsByCity);

export default hotelRouter