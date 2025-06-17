// import from "../modles/trips.model.js";
import validateTrip from '../../validation/trips.js';
import tripModel from '../modles/trips.model.js';
import userModle from '../modles/user.modle.js';
import hotelModel from './../modles/hotels.model.js';





export const addTrip = async (req, res) => {
  try {
    const { name, description, price, city, location, date ,type} = req.body;

    const photos = req.files?.map(file => file.path); // handled by multer

    const data = {
      name: name?.trim(),
      description: description?.trim(),
      price: Number(price),
      city: city?.trim(),
      location: location?.trim(),
      type: type?.trim(),
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
    const { city, type } = req.query; // get city and type from query string

    // Build dynamic query object
    const query = {};
    if (city) {
      query.city = { $regex: new RegExp(city, 'i') };
    }
    if (type) {
      query.type = { $regex: new RegExp(type, 'i') };
    }

    const trips = await tripModel.find(query);

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ error: "Error fetching trips" });
  }
};

export const getWishList = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModle.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const wishlistIds = user.wishlist;

    // Try to find matching Trips
    const trips = await tripModel.find({ _id: { $in: wishlistIds } });

    // Get the IDs that were *not* found as trips
    const tripIds = trips.map(trip => tripModel._id);
    const remainingIds = wishlistIds.filter(
      id => !tripIds.includes(id)
    );

    // Try to find those as Hotels
    const hotels = await hotelModel.find({ _id: { $in: remainingIds } });

    const fullWishlist = [...trips, ...hotels];

    res.status(200).json(fullWishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteWishList= async (req,res)=>{
  try {
    const userId = req.user?.id || req.body.userId || req.query.userId;
    const { tripId } = req.params;

    if (!userId || !tripId) {
      return res.status(400).json({ message: "User ID and Trip ID are required" });
    }

    const user = await userModle.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if trip exists in wishlist
    const index = user.wishlist.indexOf(tripId);
    if (index === -1) {
      return res.status(400).json({ message: "Trip not in wishlist" });
    }

    // Remove the trip ID
    user.wishlist.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Trip removed from wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}