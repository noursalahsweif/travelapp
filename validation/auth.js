import * as yup from 'yup'
export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name cannot be empty")
    .test("isPerfectString", "Enter a valid name", (arg) =>
      /^[A-Za-z ]+$/.test(arg)
    ),

  phone: yup
    .string()
    .trim()
    .required("Phone number is required"),

  email: yup
    .string()
    .trim()
    .required("Enter your email")
    .email("Enter a valid email"), // simpler and built-in

  password: yup
    .string()
    .trim()
    .required("Password cannot be empty")
    .min(8, "Password must be at least 8 characters"),

  cpassword: yup
    .string()
    .trim()
    .required("Confirm password can't be empty")
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
