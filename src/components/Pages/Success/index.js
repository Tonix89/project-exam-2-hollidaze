import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";

function SuccessPage() {
  const name = useParams().name;

  switch (name) {
    case "createBooking":
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

    default:
      return "";
  }
}

export default SuccessPage;
