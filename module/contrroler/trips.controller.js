// import from "../modles/trips.model.js";
import validateTrip from '../../validation/trips.js';
import tripModel from '../modles/trips.model.js';
import userModle from '../modles/user.modle.js';
import hotelModel from './../modles/hotels.model.js';





export const addTrip = async (req, res) => {
  try {
    const { name, description, price, city, location ,type, rating} = req.body;

    const photos = req.files?.map(file => file.path); // handled by multer

    const data = {
      name: name?.trim(),
      description: description?.trim(),
      price: Number(price),
      city: city?.trim(),
      location: location?.trim(),
      type: type?.trim(),
      rating: Number(rating) ,
      photos
    };

    const result = await validateTrip(data);

    if (!result.valid) {
      return res.status(400).json({ message: result.errors });
    }

    const savedTrip = await tripModel.create(data);
    res.status(200).json(savedTrip);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
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
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTripsByCity = async (req, res) => {
  try {
    const { city, type } = req.query; 
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
    res.status(500).json({ message: "Internal server error" });
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

    const trips = await tripModel.find({ _id: { $in: wishlistIds } });

    const tripIds = trips.map(trip => tripModel._id);
    const remainingIds = wishlistIds.filter(
      id => !tripIds.includes(id)
    );

    const hotels = await hotelModel.find({ _id: { $in: remainingIds } });

    const fullWishlist = [...trips, ...hotels];

    res.status(200).json(fullWishlist);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error ' });
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

    const index = user.wishlist.indexOf(tripId);
    if (index === -1) {
      return res.status(400).json({ message: "Trip not in wishlist" });
    }

    user.wishlist.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Trip removed from wishlist", wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}