import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Firstname is required')
    .max(60),
  lastName: Yup.string()
    .required('Lastname is required')
    .max(60),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Too short. Must be minimum of 6 characters')
    .required('Password is required'),
});
