// import from "../modles/trips.model.js";
import validateTrip from '../../validation/trips.js';
import tripModel from './../modles/trips.model.js';





export const addTrip = async (req, res) => {
  try {
    const { name, description, price, city, location, date } = req.body;

    const photos = req.files?.map(file => file.path); // handled by multer

    const data = {
      name: name?.trim(),
      description: description?.trim(),
      price: Number(price),
      city: city?.trim(),
      location: location?.trim(),
      date: date ? new Date(date) : undefined,
      photos
    };

    const result = await validateTrip(data);

    if (!result.valid) {
      return res.status(400).json({ errors: result.errors });
    }

    const savedTrip = await tripModel.create(data);
    res.status(200).json(savedTrip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating trip" });
  }
};
 
   export const getalltrips = async (req, res) => {
    try {
        const trips = await tripModel.find(); // Fetch all hotels
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: "Error fetching trips", error });
    }
};

export const getTrip = async (req, res) => {
    try {
        const { id } = req.params;  // Get trip ID from URL
        console.log("Trip ID:", id);

        // Check if trip exists before populating
        const trip = await tripModel.findById(id);
        if (!trip) return res.status(404).json({ error: "Trip not found" });

        // Fetch trip and populate related data
        const populatedTrip = await tripModel
            .findById(id)
            .populate("hotelId", "name city")  // Only fetch specific fields
            .populate("roomId", "type price")
            .populate("flightId", "airline departure");

        console.log("Trip with populate:", populatedTrip);
        res.status(200).json(populatedTrip);
    } catch (error) {
        console.error("Error fetching trip:", error);
        res.status(500).json({ error: "Error fetching trip" });
    }
};
