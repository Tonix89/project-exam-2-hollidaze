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
  Snackbar,
  Alert,
} from "@mui/material";
import theme from "../../../styles/theme";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Availability from "../../Calendar/Availability";
import Login from "../../Login";
import SignUp from "../../Sign_up";
import delApi from "../../../api/Delete";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import BookingInfo from "../../Modal/Booking";
import { Helmet, HelmetProvider } from "react-helmet-async";

function SingleVenue() {
  const token = localStorage.getItem("holiToken");
  const user = localStorage.getItem("holiUser");
  const params = useParams();

  const [loader, setLoader] = useState(false);

  const [openSignup, setOpenSignup] = useState(false);
  const signUpOpen = () => setOpenSignup(true);
  const signUpClose = () => setOpenSignup(false);

  const [openLogin, setOpenLogin] = useState(false);
  const loginOpen = () => setOpenLogin(true);
  const loginClose = () => setOpenLogin(false);

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("warning");

  const [bookingInfoModal, setBookingInfoModal] = useState(false);
  const closeBookingInfoModal = () => setBookingInfoModal(false);

  const handleDeleteVenue = () => {
    setAlert(false);
    setLoader(true);
    const delUrl = "https://api.noroff.dev/api/v1/holidaze/venues/" + params.id;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    delApi(delUrl, options).then((res) => {
      if (res.ok) {
        setLoader(false);
        window.location.href = `/profile/${user}`;
      } else {
        setAlertSeverity("error");
        setAlertText(
          "Sorry, we have error deleting your venue. Error: " + res.message,
        );
        setLoader(false);
        setAlert(true);
      }
    });
  };

  const url =
    "https://api.noroff.dev/api/v1/holidaze/venues/" +
    params.id +
    "?_owner=true&_bookings=true&_customer=true";

  const { data, isLoading, isError } = GetVenue(url);

  if (isLoading || loader) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }

  if (isError) {
    return <Box>Sorry, we have an error. {data.message}...</Box>;
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
    <HelmetProvider>
      <Card
        sx={{ border: "1px solid", borderColor: theme.palette.secondary.main }}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>{data.name}</title>
          <meta name='description' content={data.description} />
          <link rel='canonical' href='https://holidazetonix.netlify.app/' />
        </Helmet>
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
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={alert}>
            <Box sx={{ width: "100%" }}>
              <Snackbar
                open={alert}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert
                  variant='filled'
                  severity={alertSeverity}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "& .MuiAlert-message": {
                      display: "flex",
                      alignItems: "center",
                    },
                  }}>
                  <Typography>{alertText}</Typography>
                  {alertSeverity === "warning" ? (
                    <Box>
                      <Button
                        color='inherit'
                        size='small'
                        onClick={handleDeleteVenue}>
                        Yes
                      </Button>
                      <Button
                        color='inherit'
                        size='small'
                        onClick={() => setAlert(false)}>
                        No
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      color='inherit'
                      size='small'
                      onClick={() => setAlert(false)}>
                      <CloseIcon color='inherit' size='small' />
                    </Button>
                  )}
                </Alert>
              </Snackbar>
            </Box>
          </Backdrop>
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
                  Unavailable
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
            {user === data.owner.name ? (
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "16px", sm: "20px" },
                      m: 0,
                    }}>
                    Total Bookings :
                  </Typography>
                  {data.bookings.length !== 0 ? (
                    <Button
                      variant='outlined'
                      onClick={() => setBookingInfoModal(true)}
                      sx={{
                        p: 0,
                        minWidth: "70px",
                        ml: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <Typography
                        gutterBottom
                        variant='h6'
                        sx={{
                          fontWeight: "bold",
                          m: 0,
                          pl: 1,
                        }}>
                        {data.bookings.length}
                      </Typography>
                      <MoreVertRoundedIcon />
                    </Button>
                  ) : (
                    <Typography
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "16px", sm: "20px" },
                        m: 0,
                        pl: 1,
                      }}>
                      No bookings yet.
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                    mt: 2,
                  }}>
                  <NavLink to={`/venue/edit/${params.id}`}>
                    <Button
                      variant='contained'
                      sx={{
                        width: 150,
                        borderRadius: "20px",
                        fontWeight: "bold",
                      }}>
                      Edit Venue
                    </Button>
                  </NavLink>
                  <Button
                    variant='contained'
                    onClick={() => {
                      setAlert(true);
                      setAlertSeverity("warning");
                      setAlertText(
                        "Are you sure you want to delete this venue?",
                      );
                    }}
                    sx={{
                      width: 150,
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}>
                    Delete Venue
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
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
                      onClick={() => {
                        setAlert(true);
                        setAlertSeverity("error");
                        setAlertText("You must login first.");
                      }}>
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
              </>
            )}
          </Box>
        </CardContent>
      </Card>
      {token && user === data.owner.name && (
        <BookingInfo
          value={data.bookings}
          open={bookingInfoModal}
          handleClose={closeBookingInfoModal}
        />
      )}
      <Login open={openLogin} loginClose={loginClose} signUpOpen={signUpOpen} />
      <SignUp
        open={openSignup}
        signUpClose={signUpClose}
        loginOpen={loginOpen}
      />
    </HelmetProvider>
  );
}

export default SingleVenue;
