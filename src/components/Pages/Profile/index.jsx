import { useState } from "react";
import { useParams } from "react-router";
import {
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Backdrop,
  Tabs,
  Tab,
  Grid,
  Container,
} from "@mui/material";
import PropTypes from "prop-types";
import theme from "../../../styles/theme";
import GetApi from "../../../api/Get";
import BookingCard from "../../Cards/Bookings";
import VenueCard from "../../Cards/Venue";
import { NavLink } from "react-router-dom";
import { getToken } from "../../../tools/Token";
import EditProfile from "../../Edit_profile";

function MenuTab(props) {
  const { children, value, index } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}>
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

MenuTab.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function tabProps(index) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
}

function Profile() {
  const user = useParams().user;
  const token = getToken();

  if (!token) {
    window.location.href = "/";
  }

  const [value, setValue] = useState(0);

  const [openEditProfile, setOpenEditProfile] = useState(false);
  const editModalOpen = () => setOpenEditProfile(true);
  const editModalClose = () => setOpenEditProfile(false);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const url =
    "https://api.noroff.dev/api/v1/holidaze/profiles/" +
    user +
    "?_bookings=true&_venues=true";

  const { data, isLoading, isError } = GetApi(url);

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

  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.light.main }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar
            alt={data.name}
            src={data.avatar}
            sx={{
              width: { xs: "50px", sm: "100px" },
              height: { xs: "50px", sm: "100px" },
            }}
          />
          <Typography
            sx={{ fontSize: { xs: "20px", sm: "38px" }, fontWeight: "bold" }}>
            {data.name}
          </Typography>
          <Box sx={{ alignSelf: "start", my: 2 }}>
            <Typography
              sx={{ fontSize: { xs: "15px", sm: "24px" }, fontWeight: "bold" }}>
              Email : {data.email}
            </Typography>
            <Typography
              sx={{ fontSize: { xs: "15px", sm: "24px" }, fontWeight: "bold" }}>
              Venue Manager : {data.venueManager ? "Yes" : "No"}
            </Typography>
          </Box>
          <Button
            variant='contained'
            onClick={editModalOpen}
            sx={{
              backgroundColor: "white",
              color: theme.palette.secondary.main,
              fontWeight: "bold",
              border: "2px solid",
              borderColor: theme.palette.grey.main,
            }}>
            Edit Profile
          </Button>
        </Box>
      </Box>
      <Box>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='Profile menu tabs'
            textColor='primary'
            sx={{
              mb: 2,
            }}>
            <Tab
              label='Bookings'
              sx={{ fontWeight: "bold" }}
              {...tabProps(0)}
            />
            {data.venueManager && (
              <Tab
                label='Venues'
                sx={{ fontWeight: "bold" }}
                {...tabProps(1)}
              />
            )}
            <Tab label='History' sx={{ fontWeight: "bold" }} {...tabProps(2)} />
          </Tabs>
        </Box>
        <MenuTab value={value} index={0}>
          <Grid
            container
            spacing={{ xs: 2, md: 1 }}
            columns={{ xs: 4, sm: 8, md: 12 }}>
            {data.bookings.map((booking) => (
              <Grid
                key={booking.id}
                item
                xs={12}
                sm={4}
                md={6}
                sx={{ width: "-webkit-fill-available" }}>
                <NavLink
                  to={`/venue/${booking.venue.id}`}
                  style={{ textDecoration: "none" }}>
                  <BookingCard value={booking} />
                </NavLink>
              </Grid>
            ))}
          </Grid>
        </MenuTab>
        <MenuTab value={value} index={data.venueManager ? 1 : -1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <NavLink to={`/venue/create`} style={{ textDecoration: "none" }}>
              <Button
                variant='contained'
                sx={{
                  width: 200,
                  borderRadius: "20px",
                  fontWeight: "bold",
                  mb: 2,
                }}>
                Create Venue
              </Button>
            </NavLink>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}>
              {data.venues.length === 0 ? (
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 5,
                  }}>
                  <Typography>You have no venue created yet.</Typography>
                </Container>
              ) : (
                data.venues.map((venue) => (
                  <Grid
                    key={venue.id}
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    sx={{ width: "-webkit-fill-available" }}>
                    <NavLink
                      to={`/venue/${venue.id}`}
                      style={{ textDecoration: "none" }}>
                      <VenueCard value={venue} />
                    </NavLink>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </MenuTab>
        <MenuTab value={value} index={data.venueManager ? 2 : 1}>
          User past bookings
        </MenuTab>
      </Box>
      <EditProfile data={data} open={openEditProfile} close={editModalClose} />
    </>
  );
}

export default Profile;
