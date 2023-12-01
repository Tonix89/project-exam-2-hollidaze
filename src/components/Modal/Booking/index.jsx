import React, { useState, useEffect } from "react";
import getBookingApi from "../../../api/Booking";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import theme from "../../../styles/theme";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";

const token = localStorage.getItem("holiToken");

function BookingInfo(props) {
  const bookings = props.value;
  const isOpen = props.open;
  const handleClose = props.handleClose;

  const [data, setData] = useState();

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  useEffect(() => {
    const book = [];
    bookings.map(async (booking) => {
      const url = `https://api.noroff.dev/api/v1/holidaze/bookings/${booking.id}?_customer=true`;
      const res = await getBookingApi(url, token);
      if (res.message) {
        setAlert(true);
        setAlertText("Error in fetching bookings");
      } else {
        book.push(res);
        setAlert(false);
      }
    });
    setData(book);
  }, [bookings]);

  if (data) {
    return (
      <>
        <Box sx={{ width: "100%" }}>
          <Snackbar
            open={alert}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert
              variant='filled'
              severity='warning'
              sx={{
                display: "flex",
                alignItems: "center",
                "& .MuiAlert-message": {
                  display: "flex",
                  alignItems: "center",
                },
              }}>
              <Typography>{alertText}</Typography>
              <Button
                color='inherit'
                size='small'
                onClick={() => setAlert(false)}>
                <CloseIcon color='inherit' size='small' />
              </Button>
            </Alert>
          </Snackbar>
        </Box>
        <Dialog
          sx={{
            "& .MuiDialog-paperScrollBody": {
              border: "2px solid",
              borderColor: theme.palette.secondary.main,
              borderRadius: "10px",
              boxShadow: 24,
              maxWidth: { xs: "lg", md: "md" },
            },
          }}
          open={isOpen}
          scroll='body'
          onClose={handleClose}
          fullWidth={true}
          aria-labelledby='scroll-dialog-title'
          aria-describedby='scroll-dialog-description'>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Box sx={{ alignSelf: "end" }}>
              <Button onClick={handleClose} sx={{ minWidth: 0, p: 0 }}>
                <CancelSharpIcon
                  sx={{
                    color: theme.palette.secondary.main,
                    border: `2px solid ${theme.palette.secondary.main}`,
                    borderRadius: "20px",
                  }}
                />
              </Button>
            </Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "18px", md: "25px" },
                mb: 2,
              }}>
              Venue Bookings
            </Typography>
            {data.map((booking) => (
              <Card
                sx={{ width: "-webkit-fill-available", mb: 2 }}
                variant='outlined'
                key={booking.id}>
                <CardContent
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                      mx: 1,
                    }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar
                        alt={booking.customer.name}
                        src={booking.customer.avatar}
                        sx={{
                          width: { xs: 40, md: 56 },
                          height: { xs: 40, md: 56 },
                        }}
                      />
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: { xs: "20px", md: "25px" },
                        }}>
                        {booking.customer.name}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "16px", md: "20px" },
                      }}>
                      {booking.customer.email}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      alignSelf: "start",
                      fontSize: { xs: "20px", md: "25px" },
                    }}>
                    Booking Dates :
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: "center",
                      gap: 1,
                    }}>
                    <DatePicker
                      defaultValue={dayjs(booking.dateFrom)}
                      readOnly
                    />
                    <Typography sx={{ fontWeight: "bold" }}>To</Typography>
                    <DatePicker defaultValue={dayjs(booking.dateTo)} readOnly />
                  </Box>
                  <Typography
                    sx={{
                      alignSelf: "start",
                      fontWeight: "bold",
                      fontSize: { xs: "20px", md: "25px" },
                    }}>
                    Number of Guests : {booking.guests}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default BookingInfo;
