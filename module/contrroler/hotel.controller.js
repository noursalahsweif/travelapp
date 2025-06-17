import validateHotel from "../../validation/hotel.js";
import hotelModel from "../modles/hotels.model.js";

export const createHotel = async (req, res, next) => {

    try {

      const {name,city,location,rating,description,price} = req.body

      const photos = req.files?.map(file => file.path);
      
      const data = {name,city,location,photos,rating,description,price}
      console.log(data);
      
      const result = await validateHotel(data);
       if (!result.valid) {
    return res.status(400).json({ message:"validation error" });
  }

      const savedHotel = await hotelModel.create(data);
      res.status(200).json(savedHotel);
    } catch (err) {
      res.status(500).json({ error: "Error adding hotel" })
    }
  };

  export const getHotel = async (req, res, next) => {
    const hotelId = req.params.id
    console.log(hotelId);
    
    try {
      const hotel = await hotelModel.findById(hotelId);
      res.status(200).json(hotel);
    } catch (err) {
      res.status(500).json({ message: "hotel not found" })
    }
  };

    export const getHotels = async (req, res) => {
      try {
      const { city } = req.query; // get city from query string

      // Create query object: either filtered by city or all
      const query = city ? { city: { $regex: new RegExp(city, 'i') } } : {};

      const hotels = await hotelModel
        .find(query)
        

      res.status(200).json(hotels);
    } catch (error) {
      console.error("Error fetching hotel:", error);
      res.status(500).json({ error: "Error fetching hotel" });
    }
  };

