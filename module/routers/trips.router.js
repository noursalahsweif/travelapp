import { Router } from "express";
import { addTrip, getTrip } from "../contrroler/trips.controller.js";




const tripRouter = Router()

tripRouter.post('/addtrip',addTrip);
tripRouter.get('/gettrip/:_id',getTrip);


export default tripRouter