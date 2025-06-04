import * as yup from 'yup'

const hotelValidationSchema = yup.object({
  name: yup.string().required('Hotel name is required'),
  description: yup.string().required('Description is required'),
  city: yup.string().required('City is required'),
  location: yup.string().required('Location is required'),
  photos: yup.array().of(yup.string().url('Each photo must be a valid URL')),
  price: yup.number().required('Price is required').min(0, 'Price must be a positive number'),
  rating: yup.number().min(0, 'Rating must be at least 0').max(5, 'Rating cannot exceed 5'),
});

const validateHotel = async (data) => {
  try {
    await hotelValidationSchema.validate(data, { abortEarly: false });
    return { valid: true };
  } catch (err) {
    return {
      valid: false,
      errors: err.errors,
    };
  }
};

export default validateHotel