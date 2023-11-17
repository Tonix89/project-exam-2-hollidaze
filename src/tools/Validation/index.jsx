import * as yup from 'yup';

export const schema = yup.object({
  name: yup
    .string()
    .min(3, 'Must be at least 3 characters')
    .max(12, 'Must not be more than 12 characters')
    .required(),
  email: yup
    .string()
    .matches(
      /^[A-Z0-9._%+-]+@stud\.noroff\.no$/i,
      'Invalid email address. Please use an email with the domain "stud.noroff.no".',
    )
    .required(),
  password: yup.string().min(8, 'Must be at least 8 characters').required(),
  avatar: yup.string().url('Invalid URL format').required(),
});
