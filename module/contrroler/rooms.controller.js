// import hotelModel from "../modles/hotels.model.js";
// import roomModle from "../modles/rooms.model.js";


// export const addRoomToHotel = async (req, res) => {
//     try {
//         const  hotelId  = req.params;
//         const { title, price , maxPeople , desc} = req.body;

//         const hotel = await hotelModel.findById(hotelId);
//         if (!hotel) {
//             return res.status(404).json({ message: "Hotel not found" });
//         }

//         // Create new room
//         const savedRoom = await roomModle.create({hotelId,title, price , maxPeople , desc})
        
//         // console.log(savedRoom);
        

//         await hotelModel.findByIdAndUpdate(
//             hotelId,
//             { $push: { rooms: savedRoom._id } }, // Use `$push` to add ID to the array
//             { new: true, useFindAndModify: false }
//         );
        
        

//         res.status(201).json({ message: "Room added successfully", room: savedRoom });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding room", error });
//     }
// };


// export const getHotelRooms = async (req, res) => {
//     try {
//         const { hotelId } = req.params; 
//         const hotel = await hotelModel.findById(hotelId);
//         if (!hotel) {
//             return res.status(404).json({ message: "Hotel not found" });
//         }

        
//         const rooms = hotel.rooms
        

//         res.status(201).json({ message: "Room added successfully", room: rooms });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding room", error });
//     }
// };