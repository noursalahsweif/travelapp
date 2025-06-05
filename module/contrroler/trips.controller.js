// import from "../modles/trips.model.js";
import validateTrip from '../../validation/trips.js';
import tripModel from '../modles/trips.model.js';





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

// trips.controller.js
export const getTrip = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const trip = await tripModel.findById(id);
      if (!trip) return res.status(404).json({ error: "Trip not found" });

      const populatedTrip = await tripModel
        .findById(id)
        

      return res.status(200).json(populatedTrip);
    } 
  } catch (error) {
    console.error("Error fetching trip(s):", error);
    res.status(500).json({ error: "Error fetching trip(s)" });
  }
};

export const getTripsByCity = async (req, res) => {
  try {
    const { city } = req.query; // get city from query string

    // Create query object: either filtered by city or all
    const query = city ? { city: { $regex: new RegExp(city, 'i') } } : {};

    const trips = await tripModel
      .find(query)
      

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ error: "Error fetching trips" });
  }
};

