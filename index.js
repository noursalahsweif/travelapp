import express from 'express'
import mongoDbConnection from './db/db.connection.js'


import cors from "cors";
import userRouter from './module/routers/user.router..js';
import dotenv from 'dotenv';
import hotelRouter from './module/routers/hotel.router.js';

import tripRouter from './module/routers/trips.router.js';
dotenv.config();
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    //  origin:"http://localhost:3000",
    origin:["https://travio.online","http://localhost:3000"],
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))


mongoDbConnection()

app.use('/user',userRouter)
app.use('/hotel',hotelRouter)
// app.use('/room',roomRouter)
app.use('/trip',tripRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))