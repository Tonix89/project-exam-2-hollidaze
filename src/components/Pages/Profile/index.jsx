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
} from "@mui/material";
import PropTypes from "prop-types";
import theme from "../../../styles/theme";
import GetApi from "../../../api/Get";

function MenuTab(props) {
  const { children, value, index } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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

  const [value, setValue] = useState(0);

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
            textColor='primary'>
            <Tab
              label='Bookings'
              sx={{ fontWeight: "bold" }}
              {...tabProps(0)}
            />
            <Tab label='Venues' sx={{ fontWeight: "bold" }} {...tabProps(1)} />
            <Tab label='History' sx={{ fontWeight: "bold" }} {...tabProps(2)} />
          </Tabs>
        </Box>
        <MenuTab value={value} index={0}>
          User present bookings
        </MenuTab>
        <MenuTab value={value} index={1}>
          User venues
        </MenuTab>
        <MenuTab value={value} index={2}>
          User past bookings
        </MenuTab>
      </Box>
    </>
  );
}

export default Profile;
