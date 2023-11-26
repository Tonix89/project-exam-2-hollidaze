import { Card, CardMedia, CardContent, Box, Typography } from "@mui/material";
import theme from "../../../styles/theme";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function VenueCard(props) {
  const venue = props.value;

  return (
    <>
      <Card
        sx={{
          border: "1px solid",
          borderColor: theme.palette.secondary.main,
          height: "150px",
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
        }}>
        <CardMedia
          component='img'
          image={venue.media[0]}
          alt={venue.name}
          sx={{ p: 0.5, width: "40%", borderRadius: "10px", height: "150px" }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "60%",
            p: 0,
            mr: 0.5,
            height: "150px",
            "&.MuiCardContent-root:last-child ": { pb: 1 },
          }}>
          <Typography
            gutterBottom
            variant='body1'
            sx={{
              fontWeight: "bold",
              wordWrap: "break-word",
            }}>
            {venue.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant='body2' sx={{ fontWeight: "bold" }}>
              Max Guest : {venue.maxGuests}
            </Typography>
            <LocationOnIcon sx={{ color: "light.main" }} />
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default VenueCard;
