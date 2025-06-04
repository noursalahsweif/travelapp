import * as yup from 'yup';

// Regex: allows letters, numbers, spaces, commas, dots, hyphens; blocks script/code
const safeTextRegex = /^[a-zA-Z0-9\s.,'"\-()!?&@]+$/;

const tripValidationSchema = yup.object({
  name: yup
    .string()
    .matches(safeTextRegex, 'Name contains invalid characters')
    .required('Name is required'),

  description: yup
    .string()
    .matches(safeTextRegex, 'Description contains invalid characters')
    .required('Description is required'),

  photos: yup
    .array()
    .of(yup.string().url('Each photo must be a valid URL'))
    .optional(),

  price: yup
    .number()
    .required('Price is required')
    .min(0, 'Price must be a positive number'),

  location: yup
    .string()
    .matches(safeTextRegex, 'Location contains invalid characters')
    .optional(),
  
  city: yup 
  .string()
  .matches(safeTextRegex, 'city contains invalid characters')
  .required('city feild is empty'),

  date: yup
    .date()
    .typeError('Date must be a valid date')
    .optional(),
});


const validateTrip = async (data) => {
  try {
    await tripValidationSchema.validate(data, { abortEarly: false });
    return { valid: true };
  } catch (err) {
    return {
      valid: false,
      errors: err.errors,
    };
  }
};

export default validateTrip