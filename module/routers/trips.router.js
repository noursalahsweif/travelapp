import { Router } from "express";
import { addTrip, getalltrips, getTrip } from "../contrroler/trips.controller.js";
import upload, { uploadTrip } from "../../helper/uploadcloud.js";




const tripRouter = Router()

tripRouter.post('/addtrip', uploadTrip.array('photos', 5), addTrip);
tripRouter.get('/gettrip/:_id',getTrip);
tripRouter.get('/gettrips',getalltrips);


export default tripRouter