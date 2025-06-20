import express from 'express'
import mongoDbConnection from './db/db.connection.js'


import cors from "cors";
import userRouter from './module/routers/user.router..js';
import dotenv from 'dotenv';

import hotelRouter from './module/routers/hotel.router.js';
import  { bookHotelNow, bookNow } from './module/contrroler/intro.controller.js';
import tripRouter from './module/routers/trips.router.js';
import { jwtCheck } from './utils/jwtGeneration.js';
import { authLoginHelper } from './helper/auth.js';
// import introRouter from './module/routers/intro.model.js';
// import { bookNow } from './module/contrroler/intro.controller.js';

dotenv.config();
const app = express()
const port = 3000

app.use(express.json())
app.get('/protected-route', jwtCheck, async (req, res) => {
   
    if (req.user) { 
        const userData = await  authLoginHelper(req.user.email)
        
        
        res.status(200).json({
            message: `Welcome, ${userData.name}! This is a protected resource.`,
            user: req.user
        });
    } else {
        
        res.status(500).json({ message: "User data not found after authentication." });
    }
});


app.use(express.urlencoded({ extended: true }));
app.use(cors({
    //  origin:"http://localhost:3000",
    origin:["https://travio.online","http://localhost:3000"],
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))


mongoDbConnection()
app.get('/', (req, res) => {
    res.send('Welcome to my Travel App API!');
});

app.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint is working!' });
});
app.use('/user',userRouter)
app.post('/book/:id',jwtCheck, bookNow)
app.post('/bookhotel/:id',jwtCheck, bookHotelNow)
app.use('/hotel',hotelRouter)
app.use('/trip',tripRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))