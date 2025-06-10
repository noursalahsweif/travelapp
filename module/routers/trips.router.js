import { Router } from "express";
import { addTrip,  deleteWishList,  getTrip, getTripsByCity, getWishList } from "../contrroler/trips.controller.js";
import upload, { uploadTrip } from "../../helper/uploadcloud.js";
import { jwtCheck } from "../../utils/jwtGeneration.js";




const tripRouter = Router()

tripRouter.post('/addtrip', uploadTrip.array('photos', 5), addTrip);

tripRouter.get('/gettrips',getTripsByCity);
tripRouter.get('/gettripsbyid/:id?',getTrip);
tripRouter.get('/wishlist/', jwtCheck ,getWishList);
tripRouter.delete('/deletewishlist/', jwtCheck ,deleteWishList);


export default tripRouter