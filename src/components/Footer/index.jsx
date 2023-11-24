import { Typography } from "@mui/material";
import { Box, Container } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "light.main",
          color: "primary",
          padding: "20px",
          mt: 1,
        }}>
        <Box
          sx={{
            display: "flex",
            marginBottom: "20px",
            fontWeight: "bold",
          }}>
          Need Help?{" "}
          <NavLink to='/contact'>
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                ml: 1,
              }}>
              Contact Us
            </Typography>
          </NavLink>
        </Box>
        <Typography
          variant='body1'
          sx={{
            fontWeight: "bold",
          }}>
          All Rights Reserved. Holidaze &copy; 2023
        </Typography>
      </Box>
    </Container>
  );
}
