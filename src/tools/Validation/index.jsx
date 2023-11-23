import * as yup from 'yup';

export const signUpSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Must be at least 3 characters')
    .max(12, 'Must not be more than 12 characters')
    .required('Must not be empty.'),
  email: yup
    .string()
    .matches(
      /^(.+)@(stud\.noroff\.no|noroff\.no)$/i,
      'Invalid email address. Please use an email with the domain "stud.noroff.no" or "noroff.no".',
    )
    .required('Must not be empty.'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .required('Must not be empty.'),
  avatar: yup.string().url('Invalid URL format').required('Must not be empty.'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .matches(
      /^(.+)@(stud\.noroff\.no|noroff\.no)$/i,
      'Invalid email address. Please use an email with the domain "stud.noroff.no" or "noroff.no".',
    )
    .required('Must not be empty.'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .required('Must not be empty.'),
});
