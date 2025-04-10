import hotelModel from "../modles/hotels.model.js";

export const createHotel = async (req, res, next) => {

    try {
      const savedHotel = await hotelModel.create(req.body);
      res.status(200).json(savedHotel);
    } catch (err) {
      next(err);
    }
  };

  export const getHotel = async (req, res, next) => {
    const hotelId = req.params.id
    console.log(hotelId);
    
    try {
      const hotel = await hotelModel.findById(hotelId);
      res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  };

  export const getHotels = async (req, res) => {
    try {
        const hotels = await hotelModel.find(); // Fetch all hotels
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels", error });
    }
};

export const getHotelsByCity = async (req, res) => {
  try {
    const cities = req.body
    console.log(cities.city);
    
    const hotels = await hotelModel.find({ city:cities.city});
    // Fetch all hotels
      res.status(200).json(hotels);
  } catch (error) {
      res.status(500).json({ message: "Error fetching hotels", error });
  }
};