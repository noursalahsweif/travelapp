import { Router } from "express";
import { addTrip,  getTrip, getTripsByCity } from "../contrroler/trips.controller.js";
import upload, { uploadTrip } from "../../helper/uploadcloud.js";




const tripRouter = Router()

tripRouter.post('/addtrip', uploadTrip.array('photos', 5), addTrip);
// tripRouter.get('/gettrip/:_id',getTrip);

tripRouter.get('/gettrips',getTripsByCity);
tripRouter.get('/gettripsbyid/:id?',getTrip);


export default tripRouter