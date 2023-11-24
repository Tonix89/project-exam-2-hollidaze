import React, { useState } from "react";
import GetVenue from "../../../api/Venue";
import { useParams, NavLink } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
  Avatar,
} from "@mui/material";
import theme from "../../../styles/theme";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Availability from "../../Calendar/Availability";
import Login from "../../Login";
import SignUp from "../../Sign_up";

function SingleVenue() {
  const [openSignup, setOpenSignup] = useState(false);
  const signUpOpen = () => setOpenSignup(true);
  const signUpClose = () => setOpenSignup(false);

  const [openLogin, setOpenLogin] = useState(false);
  const loginOpen = () => setOpenLogin(true);
  const loginClose = () => setOpenLogin(false);

  const token = localStorage.getItem("holiToken");

  const notLoggedIn = () => {
    alert("You must login first in order to make bookings.");
    setOpenLogin(true);
  };

  const params = useParams();
  const url =
    "https://api.noroff.dev/api/v1/holidaze/venues/" +
    params.id +
    "?_owner=true&_bookings=true";

  const { data, isLoading, isError } = GetVenue(url);

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }

  if (isError) {
    return <Box>Sorry, we have an error. {data.message}.</Box>;
  }

  let city = "City";
  let country = "Country";

  if (data.location.city && data.location.city.toUpperCase() !== "UNKNOWN") {
    city = data.location.city;
  }

  if (
    data.location.country &&
    data.location.country.toUpperCase() !== "UNKNOWN"
  ) {
    country = data.location.country;
  }

  return (
    <>
      <Card
        sx={{ border: "1px solid", borderColor: theme.palette.secondary.main }}>
        <CardMedia
          component='img'
          image={data.media[0]}
          alt={data.name}
          sx={{
            p: 0.5,
            width: "-webkit-fill-available",
            borderRadius: "10px",
            maxHeight: { xs: "300px", md: "500px" },
          }}
        />
        <CardContent>
          <Box>
            <Typography
              gutterBottom
              variant='h6'
              component='div'
              sx={{
                fontWeight: "bold",
              }}>
              {data.name}
            </Typography>
            <Typography
              gutterBottom
              variant='h7'
              component='div'
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
              {city.toUpperCase()}, {country.toUpperCase()}
              <LocationOnIcon sx={{ color: "light.main" }} />
            </Typography>
            <Box
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
              <Rating
                name='rating'
                defaultValue={data.rating}
                precision={0.1}
                readOnly
                sx={{ color: "secondary.main" }}
              />
              <Typography
                gutterBottom
                variant='h6'
                component='div'
                sx={{
                  fontWeight: "bold",
                  m: 0,
                }}>
                {data.rating}
              </Typography>
            </Box>
            <Typography
              gutterBottom
              variant='h6'
              component='div'
              sx={{
                fontWeight: "bold",
              }}>
              $ {data.price}
            </Typography>
            <Typography
              gutterBottom
              variant='body2'
              component='div'
              sx={{
                fontWeight: "bold",
                textIndent: "20px",
                mb: 2,
              }}>
              {data.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, md: 2 },
                mb: 2,
              }}>
              <Typography
                gutterBottom
                variant='body2'
                component='div'
                sx={{
                  fontWeight: "bold",
                  m: 0,
                }}>
                Availability :
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "primary.main",
                  }}></Box>
                <Typography
                  gutterBottom
                  variant='body2'
                  component='div'
                  sx={{
                    fontWeight: "bold",
                    m: 0,
                  }}>
                  Available
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "grey.main",
                  }}></Box>
                <Typography
                  gutterBottom
                  variant='body2'
                  component='div'
                  sx={{
                    fontWeight: "bold",
                    m: 0,
                  }}>
                  Unavailale
                </Typography>
              </Box>
            </Box>
            <Box>
              <Availability data={data} />
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant='h6'
                component='div'
                sx={{
                  fontWeight: "bold",
                  mt: 2,
                }}>
                Other Details :
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mx: 3,
                    px: 1,
                  }}>
                  <Typography
                    gutterBottom
                    variant='body1'
                    component='div'
                    sx={{
                      fontWeight: "bold",
                    }}>
                    Wi-Fi :
                  </Typography>
                  <Typography
                    gutterBottom
                    variant='body1'
                    component='div'
                    sx={{
                      fontWeight: "bold",
                    }}>
                    {data.meta.wifi ? "Yes" : "No"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mx: 3,
                    backgroundColor: "light.main",
                    px: 1,
                  }}>
                  <Typography
                    gutterBottom
                    variant='body1'
                    component='div'
                    sx={{
                      fontWeight: "bold",
                    }}>
                    Parking Area :
                  </Typography>
                  <Typography
                    gutterBottom
                    variant='body1'
                    component='div'
                    sx={{
                      fontWeight: "bold",
                    }}>
                    {data.meta.parking ? "Yes" : "No"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mx: 3,
                    px: 1,
                  }}>
                  <Typography
                    gutterBottom
                    variant='body1'
                    component='div'
                    sx={{
                      fontWeight: "bold",
                    }}>
                    Free Breakfast:
                  </Typography>
                  <Typography
                    gutterBottom
                    variant='body1'
                    component='div'
                    sx={{
                      fontWeight: "bold",
                    }}>
                    {data.meta.breakfast ? "Yes" : "No"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mx: 3,
                    backgroundColor: "light.main",
                    px: 1,
                  }}>
                  <Typography
                    gutterBottom
                    variant='body1'
                    component='div'
                    sx={{
                      fontWeight: "bold",
                    }}>
                    Pet Allowed :
                  </Typography>
                  <Typography
                    gutterBottom
                    variant='body1'
                    component='div'
                    sx={{
                      fontWeight: "bold",
                    }}>
                    {data.meta.pets ? "Yes" : "No"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mx: 3,
                    px: 1,
                  }}>
                  <Typography
                    gutterBottom
                    variant='body1'
                    component='div'
                    sx={{
                      fontWeight: "bold",
                    }}>
                    Max Guest :
                  </Typography>
                  <Typography
                    gutterBottom
                    variant='body1'
                    component='div'
                    sx={{
                      fontWeight: "bold",
                    }}>
                    {data.maxGuests}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: "center",
              }}>
              {token ? (
                <NavLink to={`/booking/${params.id}`}>
                  <Button
                    variant='contained'
                    sx={{
                      width: 150,
                      borderRadius: "20px",
                      fontWeight: "bold",
                      my: 2,
                    }}>
                    Book Now
                  </Button>
                </NavLink>
              ) : (
                <Button
                  variant='contained'
                  sx={{
                    width: 150,
                    borderRadius: "20px",
                    fontWeight: "bold",
                    my: 2,
                  }}
                  onClick={notLoggedIn}>
                  Book Now
                </Button>
              )}
            </Box>
            <Box
              sx={{
                textAlign: { xs: "start", sm: "center" },
              }}>
              <Typography
                gutterBottom
                variant='body1'
                component='div'
                sx={{
                  fontWeight: "bold",
                  my: 2,
                }}>
                Have Questions? Contact Owner :
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "start", sm: "center" },
                    gap: 3,
                    mb: 2,
                  }}>
                  <Avatar alt={data.owner.name} src={data.owner.avatar} />
                  <Typography
                    gutterBottom
                    variant='body1'
                    component='div'
                    sx={{
                      fontWeight: "bold",
                    }}>
                    {data.owner.name}
                  </Typography>
                </Box>
                <Typography
                  gutterBottom
                  variant='body2'
                  component='div'
                  sx={{
                    fontWeight: "bold",
                  }}>
                  Email : {data.owner.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Login open={openLogin} loginClose={loginClose} signUpOpen={signUpOpen} />
      <SignUp
        open={openSignup}
        signUpClose={signUpClose}
        loginOpen={loginOpen}
      />
    </>
  );
}

export default SingleVenue;
