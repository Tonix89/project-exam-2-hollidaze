import * as yup from "yup";

export const ContactSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email address.")
    .required("Must not be empty."),
  subject: yup
    .string()
    .min(8, "Must be at least 8 characters.")
    .max(30, "Must not be more than 30 characters.")
    .required("Must not be empty."),
  message: yup
    .string()
    .min(25, "Must be at least 25 characters.")
    .max(250, "Must not be more than 250 characters.")
    .required("Must not be empty."),
});
