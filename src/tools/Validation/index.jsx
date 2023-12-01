import * as yup from "yup";

const isImageURL = (url) => {
  const imageRegex = /\.(jpeg|jpg|gif|png|bmp)(\?.*)?$/i;
  return imageRegex.test(url);
};

const isURLAccessible = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const signUpSchema = yup.object({
  name: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(12, "Must not be more than 12 characters")
    .required("Must not be empty."),
  email: yup
    .string()
    .matches(
      /^(.+)@(stud\.noroff\.no|noroff\.no)$/i,
      'Invalid email address. Please use an email with the domain "stud.noroff.no" or "noroff.no".',
    )
    .required("Must not be empty."),
  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .required("Must not be empty."),
  avatar: yup.string().url("Invalid URL format").required("Must not be empty."),
});

export const validateImageUrlSchema = yup
  .object({
    image: yup
      .string()
      .url("Image must be a valid URL.")
      .test("is-image-url", "Image URL must be a valid image URL.", (value) =>
        isImageURL(value),
      ),
  })
  .test(
    "is-url-accessible",
    "Image must be publicly accessible",
    async (values) => {
      const { image } = values;
      if (image) {
        return await isURLAccessible(image);
      }
      return true;
    },
  );

export const venueMangerSchema = yup.object({
  venueMager: yup.boolean().required(),
});
export const loginSchema = yup.object({
  email: yup
    .string()
    .matches(
      /^(.+)@(stud\.noroff\.no|noroff\.no)$/i,
      'Invalid email address. Please use an email with the domain "stud.noroff.no" or "noroff.no".',
    )
    .required("Must not be empty."),
  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .required("Must not be empty."),
});

export const createVenueSchema = yup.object({
  name: yup
    .string()
    .min(8, "Must be at least 8 characters.")
    .max(30, "Must not be more than 30 characters.")
    .required("Must not be empty."),
  description: yup
    .string()
    .min(25, "Must be at least 25 characters.")
    .max(200, "Must not be more than 200 characters.")
    .required("Must not be empty."),
  price: yup
    .number()
    .positive("Must be a positive number.")
    .integer("Must be a whole number.")
    .required("Must not be empty.")
    .typeError("Must be a number."),
  guests: yup
    .number()
    .positive("Must be a positive number.")
    .max(100, "Maximum guests should not be more than 100.")
    .integer("Must be a whole number.")
    .required("Must not be empty.")
    .typeError("Must be a number."),
  address: yup.string().required("Must not be empty."),
  city: yup.string().required("Must not be empty."),
  zipcode: yup
    .number()
    .positive("Must be a positive number.")
    .integer("Must be a whole number.")
    .required("Must not be empty.")
    .typeError("Must be a number."),
  country: yup.string().required("Must not be empty."),
  continent: yup.string().required("Must not be empty."),
});
