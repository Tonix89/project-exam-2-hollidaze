import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";

function SuccessPage() {
  const name = useParams().name;

  switch (name) {
    case "booked_venue":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}>
          <Typography variant='h6' sx={{ fontWeight: "bold" }}>
            Booking Succesful.
          </Typography>
          <Typography variant='h6' sx={{ fontWeight: "bold" }}>
            Thank you for booking with us.
          </Typography>
        </Box>
      );

    case "venue_edit":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}>
          <Typography variant='h6' sx={{ fontWeight: "bold" }}>
            Venue is successfully updated.
          </Typography>
        </Box>
      );

    case "venue_create":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}>
          <Typography variant='h6' sx={{ fontWeight: "bold" }}>
            Venue is successfully created.
          </Typography>
        </Box>
      );

    default:
      return "";
  }
}

export default SuccessPage;
