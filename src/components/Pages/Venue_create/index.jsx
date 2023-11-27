import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import theme from "../../../styles/theme";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createVenueSchema } from "../../../tools/Validation";
import { getToken } from "../../../tools/Token";
import postApi from "../../../api/Post";
import { validateImageUrlSchema } from "../../../tools/Validation";

function VenueCreate() {
  const token = getToken();

  if (!token) {
    window.location.href = "/";
  }

  const [loader, setLoader] = useState(false);

  const [imageError, setImageError] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [imageInput, setImageInput] = useState("");

  const handleAddImage = () => {
    const imageInput = document.getElementById("image").value;
    if (imageInput) {
      const data = {
        image: imageInput,
      };

      validateImageUrlSchema
        .validate(data)
        .then((res) => {
          setImageUrl([...imageUrl, res.image]);
          setImageInput("");
          setImageError("");
        })
        .catch((error) => setImageError(error.errors[0]));
    }
  };

  const handleRemoveImage = (url) => {
    const imageUrlArray = imageUrl.filter((image) => {
      if (image !== url) {
        return true;
      } else {
        return false;
      }
    });

    setImageUrl(imageUrlArray);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createVenueSchema) });

  function onSubmit(venue) {
    setLoader(true);
    const url = "https://api.noroff.dev/api/v1/holidaze/venues/";
    if (imageUrl) {
      setImageError("");
      const bodyData = {
        name: venue.name,
        description: venue.description,
        media: imageUrl,
        price: venue.price,
        maxGuests: venue.guests,
        meta: {
          wifi: venue.wifi,
          parking: venue.parking,
          breakfast: venue.breakfast,
          pets: venue.pets,
        },
        location: {
          address: venue.address,
          city: venue.city,
          zip: venue.zipcode.toString(),
          country: venue.country,
          continent: venue.continent,
        },
      };

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      };

      postApi(url, options).then((res) => {
        if (res.created) {
          window.location.href = "/success/createVenue";
        } else {
          setLoader(false);
          alert("Sorry, we have an error registering your booking. ");
        }
      });
    } else {
      setImageError("Add at least 1 image url.");
    }
  }

  if (loader) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid",
        borderColor: theme.palette.secondary.main,
        width: { xs: "100%", md: "60%" },
      }}>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component='form'
        sx={{
          display: "flex",
          flexDirection: "column",
          py: 2,
          width: "100%",
        }}>
        <Box sx={{ mb: 2, width: "100%" }}>
          <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Name</Typography>
          <TextField
            {...register("name")}
            fullWidth
            variant='outlined'
            id='name'
            label='Required'
            size='small'
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
              },
            }}
          />
          <Typography sx={{ color: "red" }}> {errors.name?.message}</Typography>
        </Box>
        <Box sx={{ mb: 2, width: "100%" }}>
          <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>
            Description
          </Typography>
          <TextField
            {...register("description")}
            fullWidth
            multiline
            rows={5}
            variant='outlined'
            id='description'
            label='Required'
            size='small'
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
              },
            }}
          />
          <Typography sx={{ color: "red" }}>
            {" "}
            {errors.description?.message}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: 3,
          }}>
          <Box sx={{ mb: 2, width: "100%" }}>
            <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Price</Typography>
            <TextField
              {...register("price")}
              fullWidth
              variant='outlined'
              id='price'
              label='Required'
              size='small'
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid",
                },
              }}
            />
            <Typography sx={{ color: "red" }}>
              {" "}
              {errors.price?.message}
            </Typography>
          </Box>
          <Box sx={{ mb: 2, width: "100%" }}>
            <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>
              Max Guest
            </Typography>
            <TextField
              {...register("guests")}
              fullWidth
              variant='outlined'
              id='guests'
              label='Required'
              size='small'
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid",
                },
              }}
            />
            <Typography sx={{ color: "red" }}>
              {" "}
              {errors.guests?.message}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            width: "100%",
          }}>
          <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Wi-Fi</Typography>
          <FormControl size='small'>
            <Select
              labelId='wifi-label'
              id='wifi'
              defaultValue={false}
              sx={{
                "& #wifi": {
                  border: `2px solid ${theme.palette.primary.main}`,
                  width: "100px",
                },
              }}>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            width: "100%",
          }}>
          <Typography sx={{ fontWeight: "bold" }}>Parking</Typography>
          <FormControl size='small'>
            <Select
              labelId='parking-label'
              id='parking'
              defaultValue={false}
              sx={{
                "& #parking": {
                  border: `2px solid ${theme.palette.primary.main}`,
                  width: "100px",
                },
              }}>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            width: "100%",
          }}>
          <Typography sx={{ fontWeight: "bold" }}>Breakfast</Typography>
          <FormControl size='small'>
            <Select
              labelId='breakfast-label'
              id='breakfast'
              defaultValue={false}
              sx={{
                "& #breakfast": {
                  border: `2px solid ${theme.palette.primary.main}`,
                  width: "100px",
                },
              }}>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            width: "100%",
          }}>
          <Typography sx={{ fontWeight: "bold" }}>Pets</Typography>
          <FormControl size='small'>
            <Select
              labelId='pets-label'
              id='pets'
              defaultValue={false}
              sx={{
                "& #pets": {
                  border: `2px solid ${theme.palette.primary.main}`,
                  width: "100px",
                },
              }}>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant='h6' sx={{ fontWeight: "bold", mb: 2 }}>
          Locations :
        </Typography>
        <Box sx={{ mb: 2, width: "100%" }}>
          <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Address</Typography>
          <TextField
            {...register("address")}
            fullWidth
            variant='outlined'
            id='address'
            label='Required'
            size='small'
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
              },
            }}
          />
          <Typography sx={{ color: "red" }}>
            {" "}
            {errors.address?.message}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: 3,
          }}>
          <Box sx={{ mb: 2, width: "100%" }}>
            <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>City</Typography>
            <TextField
              {...register("city")}
              fullWidth
              variant='outlined'
              id='city'
              label='Required'
              size='small'
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid",
                },
              }}
            />
            <Typography sx={{ color: "red" }}>
              {" "}
              {errors.address?.message}
            </Typography>
          </Box>
          <Box sx={{ mb: 2, width: "100%" }}>
            <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>
              Zip Code
            </Typography>
            <TextField
              {...register("zipcode")}
              fullWidth
              variant='outlined'
              id='zipcode'
              label='Required'
              size='small'
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid",
                },
              }}
            />
            <Typography sx={{ color: "red" }}>
              {" "}
              {errors.zipcode?.message}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: 3,
          }}>
          <Box sx={{ mb: 2, width: "100%" }}>
            <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>
              Country
            </Typography>
            <TextField
              {...register("country")}
              fullWidth
              variant='outlined'
              id='country'
              label='Required'
              size='small'
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid",
                },
              }}
            />
            <Typography sx={{ color: "red" }}>
              {" "}
              {errors.country?.message}
            </Typography>
          </Box>
          <Box sx={{ mb: 2, width: "100%" }}>
            <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>
              Continent
            </Typography>
            <TextField
              {...register("continent")}
              fullWidth
              variant='outlined'
              id='continent'
              label='Required'
              size='small'
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid",
                },
              }}
            />
            <Typography sx={{ color: "red" }}>
              {" "}
              {errors.continent?.message}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>
            Image Url
          </Typography>
          <TextField
            fullWidth
            variant='outlined'
            id='image'
            label='Required'
            size='small'
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                pr: "20px",
              },
              "& .MuiOutlinedInput-input": {
                paddingRight: "50px",
              },
            }}
          />
          <Typography sx={{ color: "red" }}>{imageError}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
          <Typography sx={{ fontWeight: "bold" }}>Add Image</Typography>
          <Button
            onClick={() => handleAddImage()}
            color='secondary'
            sx={{ p: 0, minWidth: "35px" }}>
            <AddBoxIcon
              sx={{ border: `2px solid ${theme.palette.grey.main}`, p: 0 }}
            />
          </Button>
        </Box>
        <Stack direction='row' spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          {imageUrl.map((url, i) => {
            return (
              <Box key={i} sx={{ position: "relative" }}>
                <Avatar
                  variant='square'
                  alt="Your image can't be loaded."
                  src={url}
                />
                <Button
                  variant='contained'
                  color='secondary'
                  value={url}
                  onClick={(e) => handleRemoveImage(e.target.value)}
                  sx={{
                    position: "absolute",
                    bottom: "25px",
                    left: "25px",
                    p: 0,
                    minWidth: "20px",
                  }}>
                  x
                </Button>
              </Box>
            );
          })}
        </Stack>
        <Button
          type='submit'
          variant='contained'
          sx={{
            width: 150,
            borderRadius: "20px",
            fontWeight: "bold",
            my: 2,
            alignSelf: "center",
          }}>
          Create
        </Button>
      </Box>
    </Container>
  );
}

export default VenueCreate;
