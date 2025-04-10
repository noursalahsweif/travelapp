// import from "../modles/trips.model.js";
import tripModel from './../modles/trips.model.js';
import TripSchema from './../modles/trips.model.js';




export const addTrip = async (req, res) => {
    try {
        const { userId, hotelId, roomId } = req.body;
        console.log(userId );
        console.log(hotelId );
        console.log(roomId );
        
    
        const trip = await tripModel.create({ userId, hotelId, roomId});
        console.log(trip);
        
    
        res.status(201).json(trip);
      } catch (error) {
        res.status(500).json({ error: "Error creating trip" });
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
