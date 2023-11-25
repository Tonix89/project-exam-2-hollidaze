import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import theme from "../../../styles/theme";

function BookingCard(props) {
  const booking = props.value;
  const venue = props.value.venue;

  return (
    <>
      <Card
        sx={{
          border: "1px solid",
          borderColor: theme.palette.secondary.main,
          height: "180px",
        }}>
        <CardActionArea
          sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <CardMedia
            component='img'
            image={venue.media[0]}
            alt={booking.name}
            sx={{ p: 0.5, width: "30%", borderRadius: "10px", height: "180px" }}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "70%",
              p: 0,
              mr: 0.5,
              height: "180px",
              py: 1,
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
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", sm: "column", md: "row" },
                alignItems: "center",
                gap: 0.5,
              }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "start",
                }}>
                <Typography variant='caption' sx={{ fontWeight: "bold" }}>
                  From
                </Typography>
                <DatePicker
                  sx={{
                    "& .MuiOutlinedInput-input.Mui-disabled": {
                      p: "2px",
                      fontWeight: "bold",
                      WebkitTextFillColor: theme.palette.primary.main,
                      fontSize: { xs: "x-small", sm: "medium" },
                    },
                    "& .MuiIconButton-root.Mui-disabled": { p: 0 },
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    },
                  }}
                  defaultValue={dayjs(venue.dateFrom)}
                  disabled
                />
              </Box>
              <Typography
                sx={{
                  display: { xs: "block", sm: "none", md: "block" },
                  pt: 2,
                  fontWeight: "bold",
                }}>
                -
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "start",
                }}>
                <Typography variant='caption' sx={{ fontWeight: "bold" }}>
                  To
                </Typography>
                <DatePicker
                  sx={{
                    "& .MuiOutlinedInput-input.Mui-disabled": {
                      p: "2px",
                      fontWeight: "bold",
                      WebkitTextFillColor: theme.palette.primary.main,
                      fontSize: { xs: "x-small", sm: "medium" },
                    },
                    "& .MuiIconButton-root.Mui-disabled": { p: 0 },
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    },
                  }}
                  defaultValue={dayjs(venue.dateTo)}
                  disabled
                />
              </Box>
            </Box>
            <Typography variant='body2' sx={{ fontWeight: "bold" }}>
              Guest : {booking.guests}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default BookingCard;
