import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloud.conf.js';

// Storage for hotels
const hotelStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'hotels',
    quality: 'auto:best',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

// Storage for trips
const tripStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'trips',
    quality: 'auto:best',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const introStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'intro',
    quality: 'auto:best',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: hotelStorage }); // default: hotels

// ✅ Export both uploaders
export default upload;
export const uploadTrip = multer({ storage: tripStorage });
export const uploadIntro = multer({ storage: introStorage });

